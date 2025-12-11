"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/Olympique/TopPlayers.module.css";

interface Player {
  id: number;
  name: string;
  image: string;
  position: number;
  goals: number;
  assists: number;
  jersey_number: number;
  rank?: number;
}

interface TopPlayersData {
  topScorer: Player | null;
  topAssister: Player | null;
}

const TopPlayers: React.FC = () => {
  const [data, setData] = useState<TopPlayersData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopPlayers = async () => {
      try {
        console.log("TopPlayers: Fetching data...");
        const response = await fetch("/api/olympique/top-players");
        console.log("TopPlayers: Response status:", response.status);

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const result = await response.json();
        console.log("TopPlayers: Data received:", result);
        setData(result);
      } catch (err) {
        console.error("TopPlayers: Error:", err);
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTopPlayers();
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

  if (!data || (!data.topScorer && !data.topAssister)) {
    console.log("TopPlayers: No data to display", data);
    return (
      <div className={styles.container}>
        <div className={styles.error}>Aucune donnée disponible</div>
      </div>
    );
  }

  console.log("TopPlayers: Rendering with data", data);

  return (
    <div className={styles.container}>
      <div className={styles.playersGrid}>
        {data.topScorer && (
          <div className={styles.playerCard}>
            <div className={styles.cardHeader}>
              <span className={styles.badge}>
                ⚽ {data.topScorer.rank}e Buteur Ligue 1
              </span>
            </div>
            <div className={styles.playerInfo}>
              <img
                src={data.topScorer.image}
                alt={data.topScorer.name}
                className={styles.playerImage}
              />
              <div className={styles.playerDetails}>
                <div className={styles.jerseyNumber}>
                  #{data.topScorer.jersey_number}
                </div>
                <h3 className={styles.playerName}>{data.topScorer.name}</h3>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>
                      {data.topScorer.goals}
                    </span>
                    <span className={styles.statLabel}>Buts</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>
                      {data.topScorer.assists}
                    </span>
                    <span className={styles.statLabel}>Passes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {data.topAssister && (
          <div className={styles.playerCard}>
            <div className={styles.cardHeader}>
              <span className={styles.badge}>
                🎯 {data.topAssister.rank}e Passeur Ligue 1
              </span>
            </div>
            <div className={styles.playerInfo}>
              <img
                src={data.topAssister.image}
                alt={data.topAssister.name}
                className={styles.playerImage}
              />
              <div className={styles.playerDetails}>
                <div className={styles.jerseyNumber}>
                  #{data.topAssister.jersey_number}
                </div>
                <h3 className={styles.playerName}>{data.topAssister.name}</h3>
                <div className={styles.stats}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>
                      {data.topAssister.assists}
                    </span>
                    <span className={styles.statLabel}>Passes</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>
                      {data.topAssister.goals}
                    </span>
                    <span className={styles.statLabel}>Buts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopPlayers;
