"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/Olympique/Standings.module.css";

interface DetailType {
  id: number;
  name: string;
  code: string;
}

interface Detail {
  id: number;
  type_id: number;
  value: number;
  type: DetailType;
}

interface Participant {
  id: number;
  name: string;
  short_code: string;
  image_path: string;
}

interface Standing {
  id: number;
  participant_id: number;
  sport_id: number;
  league_id: number;
  season_id: number;
  stage_id: number;
  group_id: number | null;
  round_id: number;
  standing_rule_id: number;
  position: number;
  result: string | null;
  points: number;
  participant: Participant;
  details: Detail[];
}

interface StandingsData {
  data: Standing[];
}

const Standings: React.FC = () => {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await fetch("/api/olympique/standings");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data: StandingsData = await response.json();

        if (data.data && Array.isArray(data.data)) {
          const sortedStandings = data.data.sort(
            (a, b) => a.position - b.position
          );

          setStandings(sortedStandings);
        } else {
          throw new Error("Aucune donnée trouvée");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, []);

  const getDetailValue = (details: Detail[], code: string): number => {
    if (!details || details.length === 0) return 0;
    const detail = details.find((d) => d.type?.code === code);
    return detail?.value ?? 0;
  };

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

  if (standings.length === 0)
    return (
      <div className={styles.container}>
        <div className={styles.error}>Aucune donnée disponible</div>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <div className={styles.posCol}>#</div>
          <div className={styles.teamCol}>Équipe</div>
          <div className={styles.statCol}>J</div>
          <div className={styles.statCol}>V</div>
          <div className={styles.statCol}>N</div>
          <div className={styles.statCol}>D</div>
          <div className={styles.statCol}>BP</div>
          <div className={styles.statCol}>BC</div>
          <div className={styles.statCol}>Diff</div>
          <div className={styles.ptsCol}>Pts</div>
        </div>

        <div className={styles.tableBody}>
          {standings.map((standing) => {
            const isMarseille = standing.participant_id === 44;

            const played = getDetailValue(
              standing.details,
              "overall-matches-played"
            );
            const wins = getDetailValue(standing.details, "overall-won");
            const draws = getDetailValue(standing.details, "overall-draw");
            const losses = getDetailValue(standing.details, "overall-lost");
            const goalsFor = getDetailValue(
              standing.details,
              "overall-goals-for"
            );
            const goalsAgainst = getDetailValue(
              standing.details,
              "overall-goals-against"
            );
            const goalDiff = goalsFor - goalsAgainst;

            return (
              <div
                key={standing.id}
                className={`${styles.tableRow} ${
                  isMarseille ? styles.highlighted : ""
                }`}
              >
                <div className={styles.posCol}>
                  <span className={styles.position}>{standing.position}</span>
                </div>
                <div className={styles.teamCol}>
                  <img
                    src={standing.participant.image_path}
                    alt={standing.participant.name}
                    className={styles.teamLogo}
                    width={20}
                    height={20}
                  />
                  <span className={styles.teamName}>
                    {standing.participant.short_code ||
                      standing.participant.name}
                  </span>
                </div>
                <div className={styles.statCol}>{played}</div>
                <div className={styles.statCol}>{wins}</div>
                <div className={styles.statCol}>{draws}</div>
                <div className={styles.statCol}>{losses}</div>
                <div className={styles.statCol}>{goalsFor}</div>
                <div className={styles.statCol}>{goalsAgainst}</div>
                <div className={styles.statCol}>
                  <span
                    className={
                      goalDiff > 0
                        ? styles.positive
                        : goalDiff < 0
                        ? styles.negative
                        : ""
                    }
                  >
                    {goalDiff > 0 ? `+${goalDiff}` : goalDiff}
                  </span>
                </div>
                <div className={styles.ptsCol}>
                  <span className={styles.points}>{standing.points}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Standings;
