import { NextResponse } from "next/server";

const API_TOKEN = process.env.SPORTMONKS_API_TOKEN;
const TEAM_ID = 44; // Olympique Marseille
const CURRENT_SEASON_ID = 25651; // Saison 2025/2026

export async function GET() {
  try {
    console.log(
      "Fetching player statistics from squad endpoint for season 2025/26"
    );

    // Récupérer l'effectif de Marseille
    const squadUrl = `https://api.sportmonks.com/v3/football/squads/seasons/${CURRENT_SEASON_ID}/teams/${TEAM_ID}?include=player&api_token=${API_TOKEN}`;

    const squadResponse = await fetch(squadUrl, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!squadResponse.ok) {
      throw new Error(`Squad API error: ${squadResponse.status}`);
    }

    const squadData = await squadResponse.json();
    const squadPlayers = squadData.data || [];

    console.log(`Squad players found: ${squadPlayers.length}`);

    // Récupérer les statistiques de chaque joueur
    const playersWithStats = await Promise.all(
      squadPlayers.map(async (squadPlayer: any) => {
        try {
          const statsUrl = `https://api.sportmonks.com/v3/football/players/${squadPlayer.player_id}?include=statistics.details&api_token=${API_TOKEN}`;
          const statsResponse = await fetch(statsUrl, {
            headers: { Accept: "application/json" },
            cache: "no-store",
          });

          if (!statsResponse.ok) return null;

          const statsData = await statsResponse.json();
          const seasonStats = statsData.data?.statistics?.find(
            (stat: any) => stat.season_id === CURRENT_SEASON_ID
          );

          if (!seasonStats || !seasonStats.details) return null;

          // Trouver les buts et passes décisives dans les détails
          let goals = 0;
          let assists = 0;

          seasonStats.details.forEach((detail: any) => {
            if (detail.type_id === 52) {
              // Type 52 = Goals
              goals = detail.value?.total || 0;
            }
            if (detail.type_id === 79) {
              // Type 79 = Assists
              assists = detail.value?.total || 0;
            }
          });

          return {
            player_id: squadPlayer.player_id,
            name:
              squadPlayer.player?.display_name ||
              squadPlayer.player?.common_name,
            image: squadPlayer.player?.image_path,
            jersey_number: squadPlayer.jersey_number,
            goals,
            assists,
          };
        } catch (error) {
          console.error(
            `Error fetching stats for player ${squadPlayer.player_id}:`,
            error
          );
          return null;
        }
      })
    );

    const validPlayers = playersWithStats.filter((p) => p !== null);

    console.log(`Players with valid stats: ${validPlayers.length}`);

    // Trouver le meilleur buteur et passeur de l'OM
    const topScorer = validPlayers
      .filter((p: any) => p.goals > 0)
      .sort((a: any, b: any) => b.goals - a.goals)[0];

    const topAssister = validPlayers
      .filter((p: any) => p.assists > 0)
      .sort((a: any, b: any) => b.assists - a.assists)[0];

    console.log(
      `Top OM scorer: ${topScorer?.name} - ${topScorer?.goals} goals`
    );
    console.log(
      `Top OM assister: ${topAssister?.name} - ${topAssister?.assists} assists`
    );

    // Récupérer le classement général de Ligue 1
    let allLeagueScorers: any[] = [];
    let allLeagueAssisters: any[] = [];
    let currentPage = 1;
    let hasMore = true;

    while (hasMore && currentPage <= 10) {
      const scorersUrl = `https://api.sportmonks.com/v3/football/topscorers/seasons/${CURRENT_SEASON_ID}?include=player&page=${currentPage}&api_token=${API_TOKEN}`;

      const response = await fetch(scorersUrl, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      if (!response.ok) break;

      const data = await response.json();
      const pageData = data.data || [];

      pageData.forEach((entry: any) => {
        if (entry.type_id === 83) {
          allLeagueScorers.push(entry);
        } else if (entry.type_id === 84) {
          allLeagueAssisters.push(entry);
        }
      });

      hasMore = data.pagination?.has_more || false;
      currentPage++;
    }

    // Trier par total
    allLeagueScorers.sort((a: any, b: any) => b.total - a.total);
    allLeagueAssisters.sort((a: any, b: any) => b.total - a.total);

    // Calculer le rang dans le classement général
    let topScorerRank = null;
    if (topScorer) {
      // Compter combien de joueurs ont STRICTEMENT PLUS de buts
      const betterScorers = allLeagueScorers.filter(
        (s: any) => s.total > topScorer.goals
      );
      topScorerRank = betterScorers.length + 1;
    }

    let topAssisterRank = null;
    if (topAssister) {
      // Compter combien de joueurs ont STRICTEMENT PLUS de passes
      const betterAssisters = allLeagueAssisters.filter(
        (a: any) => a.total > topAssister.assists
      );
      topAssisterRank = betterAssisters.length + 1;
    }

    console.log(`Top scorer rank in Ligue 1: ${topScorerRank}`);
    console.log(`Top assister rank in Ligue 1: ${topAssisterRank}`);

    return NextResponse.json({
      topScorer: topScorer
        ? {
            id: topScorer.player_id,
            name: topScorer.name,
            image: topScorer.image,
            goals: topScorer.goals,
            assists: topScorer.assists,
            jersey_number: topScorer.jersey_number,
            rank: topScorerRank,
          }
        : null,
      topAssister: topAssister
        ? {
            id: topAssister.player_id,
            name: topAssister.name,
            image: topAssister.image,
            goals: topAssister.goals,
            assists: topAssister.assists,
            jersey_number: topAssister.jersey_number,
            rank: topAssisterRank,
          }
        : null,
    });
  } catch (error) {
    console.error("Error fetching top players:", error);
    return NextResponse.json(
      { error: "Failed to fetch top players" },
      { status: 500 }
    );
  }
}
