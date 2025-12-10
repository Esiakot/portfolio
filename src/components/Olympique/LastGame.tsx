"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/Olympique/LastGame.module.css";

interface Score {
  description: string;
  participant_id: number;
  score: {
    goals: number;
  };
  type: {
    name: string;
  };
}

interface Participant {
  id: number;
  name: string;
  image_path: string;
}

interface Statistic {
  value?: number;
  participant_id: number;
  location: string;
  data?: {
    value: number;
  };
  type: {
    name: string;
  };
}

interface XGFixture {
  value: string;
  type: {
    name: string;
  };
}

interface Fixture {
  id: number;
  name: string;
  starting_at: string;
  participants: Participant[];
  scores: Score[];
  statistics: Statistic[];
  xgfixture: XGFixture[];
}

interface Team {
  id: number;
  name: string;
  latest: Fixture[];
}

interface LastGameData {
  data: Team;
}

const LastGame: React.FC = () => {
  const [lastGames, setLastGames] = useState<Fixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedMatch, setExpandedMatch] = useState<number | null>(0);
  const [lastClickedMatch, setLastClickedMatch] = useState<number | null>(null);

  useEffect(() => {
    const fetchLastGame = async () => {
      try {
        const response = await fetch("/api/lastgame");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data: LastGameData = await response.json();

        // Récupérer les 5 derniers matchs
        if (
          data.data &&
          Array.isArray(data.data.latest) &&
          data.data.latest.length > 0
        ) {
          setLastGames(data.data.latest.slice(0, 5));
        } else {
          throw new Error("Aucun match trouvé");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLastGame();
  }, []);

  if (loading)
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Chargement...</div>
      </div>
    );
  if (error)
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  if (lastGames.length === 0)
    return (
      <div className={styles.container}>
        <div className={styles.error}>Aucun match trouvé</div>
      </div>
    );

  const getStatsByType = (match: Fixture, statType: string) => {
    const stats = match.statistics?.filter((s) => s.type.name === statType);
    if (!stats || stats.length === 0) return null;

    const homeTeam = match.participants[0];
    const awayTeam = match.participants[1];

    const homeStat = stats.find((s) => s.participant_id === homeTeam.id);
    const awayStat = stats.find((s) => s.participant_id === awayTeam.id);

    return {
      home: homeStat?.data?.value ?? homeStat?.value ?? 0,
      away: awayStat?.data?.value ?? awayStat?.value ?? 0,
    };
  };

  const renderMatchStats = (match: Fixture) => {
    if (!match.participants || match.participants.length < 2) return null;

    const statTypes = [
      "Ball Possession %",
      "Shots On Target",
      "Shots Off Target",
      "Corners",
      "Fouls",
      "Yellow Cards",
    ];

    return (
      <div className={styles.statsContainer}>
        {statTypes.map((statType) => {
          const stats = getStatsByType(match, statType);
          if (!stats) return null;

          return (
            <div key={statType} className={styles.statRow}>
              <span className={`${styles.statValue} ${styles.home}`}>
                {stats.home}
              </span>
              <span className={styles.statLabel}>{statType}</span>
              <span className={`${styles.statValue} ${styles.away}`}>
                {stats.away}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {lastGames.map((match, index) => {
        if (!match.participants || match.participants.length < 2) return null;

        const homeTeam = match.participants[0];
        const awayTeam = match.participants[1];
        const homeScore = match.scores?.find(
          (s) => s.description === "CURRENT" && s.participant_id === homeTeam.id
        );
        const awayScore = match.scores?.find(
          (s) => s.description === "CURRENT" && s.participant_id === awayTeam.id
        );

        const isExpanded = expandedMatch === index;

        return (
          <div key={match.id} className={styles.matchWrapper}>
            <div
              className={styles.matchInfo}
              onClick={() => {
                // Si le match cliqué est déjà ouvert et c'était le dernier clic
                if (isExpanded && lastClickedMatch === index) {
                  // Rediriger vers la page du match
                  window.open(`/match/${match.id}`, "_blank");
                } else if (isExpanded) {
                  // Si ouvert mais pas le dernier clic, ouvrir le suivant
                  const nextIndex =
                    index === lastGames.length - 1 ? 0 : index + 1;
                  setExpandedMatch(nextIndex);
                  setLastClickedMatch(nextIndex);
                } else {
                  // Ouvrir ce match
                  setExpandedMatch(index);
                  setLastClickedMatch(index);
                }
              }}
            >
              <div className={styles.date}>
                {new Date(match.starting_at).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                })}
              </div>

              <div className={styles.team}>
                <img
                  src={homeTeam.image_path}
                  alt={homeTeam.name}
                  className={styles.teamLogo}
                  width={30}
                  height={30}
                />
              </div>

              <div className={styles.score}>
                {homeScore && awayScore
                  ? `${homeScore.score.goals} - ${awayScore.score.goals}`
                  : "VS"}
              </div>

              <div className={styles.team}>
                <img
                  src={awayTeam.image_path}
                  alt={awayTeam.name}
                  className={styles.teamLogo}
                  width={30}
                  height={30}
                />
              </div>
            </div>

            {isExpanded && renderMatchStats(match)}
          </div>
        );
      })}
    </div>
  );
};

export default LastGame;
