import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiToken = process.env.SPORTMONKS_API_TOKEN;

    if (!apiToken) {
      throw new Error("API token not configured");
    }

    // 1. Récupérer le schedule de l'OM pour trouver le prochain match
    const scheduleResponse = await fetch(
      `https://api.sportmonks.com/v3/football/schedules/teams/44?api_token=${apiToken}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!scheduleResponse.ok) {
      throw new Error(`API error: ${scheduleResponse.status}`);
    }

    const scheduleData = await scheduleResponse.json();

    // Récupérer tous les matchs et filtrer les prochains
    const allMatches: any[] = [];
    if (scheduleData.data && Array.isArray(scheduleData.data)) {
      scheduleData.data.forEach((stage: any) => {
        if (stage.rounds && Array.isArray(stage.rounds)) {
          stage.rounds.forEach((round: any) => {
            if (round.fixtures && Array.isArray(round.fixtures)) {
              round.fixtures.forEach((fixture: any) => {
                allMatches.push(fixture);
              });
            }
          });
        }
      });
    }

    const now = new Date();

    // Filtrer les matchs futurs en Ligue 1 (league_id: 301) et trier par date
    const upcomingLigue1Matches = allMatches
      .filter(
        (match) => new Date(match.starting_at) > now && match.league_id === 301
      )
      .sort(
        (a, b) =>
          new Date(a.starting_at).getTime() - new Date(b.starting_at).getTime()
      );

    let nextFixture = upcomingLigue1Matches[0];

    if (!nextFixture) {
      console.log("No upcoming Ligue 1 match found");
      throw new Error("Aucun prochain match en Ligue 1 trouvé");
    }

    console.log(
      "Next match found:",
      nextFixture.name,
      "on",
      nextFixture.starting_at
    );

    // 2. Récupérer les détails du match avec participants et venue
    const fixtureDetailResponse = await fetch(
      `https://api.sportmonks.com/v3/football/fixtures/${nextFixture.id}?include=participants;venue&api_token=${apiToken}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!fixtureDetailResponse.ok) {
      throw new Error(`API error: ${fixtureDetailResponse.status}`);
    }

    const fixtureDetail = await fixtureDetailResponse.json();
    const nextMatch = fixtureDetail.data;

    const opponentId = nextMatch.participants?.find(
      (p: any) => p.id !== 44
    )?.id;

    if (!opponentId) {
      throw new Error("Adversaire non trouvé");
    }

    console.log(
      "Next match found:",
      nextMatch.name,
      "- Opponent ID:",
      opponentId
    );

    // 3. Récupérer les 5 derniers matchs de l'OM (via l'endpoint teams/latest)
    const omFormResponse = await fetch(
      `https://api.sportmonks.com/v3/football/teams/44?include=latest.participants;latest.scores&api_token=${apiToken}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!omFormResponse.ok) {
      throw new Error(`API error: ${omFormResponse.status}`);
    }

    const omFormData = await omFormResponse.json();

    // 4. Récupérer les 5 derniers matchs de l'adversaire
    const opponentFormResponse = await fetch(
      `https://api.sportmonks.com/v3/football/teams/${opponentId}?include=latest.participants;latest.scores&api_token=${apiToken}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!opponentFormResponse.ok) {
      throw new Error(`API error: ${opponentFormResponse.status}`);
    }

    const opponentFormData = await opponentFormResponse.json();

    // 5. Récupérer les confrontations directes
    const h2hIncludes = ["participants", "scores"].join(";");
    const h2hUrl = `https://api.sportmonks.com/v3/football/fixtures/head-to-head/44/${opponentId}?include=${h2hIncludes}&api_token=${apiToken}`;

    const h2hResponse = await fetch(h2hUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!h2hResponse.ok) {
      const errorText = await h2hResponse.text();
      console.error("H2H API Error:", errorText);
      throw new Error(`API error: ${h2hResponse.status}`);
    }

    const h2hData = await h2hResponse.json();

    // Retourner toutes les données
    return NextResponse.json({
      nextMatch,
      headToHead: h2hData.data || [],
      omForm: omFormData.data?.latest || [],
      opponentForm: opponentFormData.data?.latest || [],
      opponentId,
    });
  } catch (error) {
    console.error("Error fetching head-to-head:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des confrontations" },
      { status: 500 }
    );
  }
}
