"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/Olympique/HeadToHead.module.css";
import Image from "next/image";

interface Score {
  participant_id: number;
  score: {
    goals: number;
  };
}

interface Participant {
  id: number;
  name: string;
  image_path: string;
}

interface Match {
  id: number;
  participants: Participant[];
  scores: Score[];
  result_info?: string;
  meta?: {
    location: string;
  };
}

interface HeadToHeadData {
  nextMatch: {
    participants: Participant[];
    venue?: {
      id: number;
      name: string;
      city_name: string;
    };
  };
  headToHead: Match[];
  omForm: Match[];
  opponentForm: Match[];
  opponentId: number;
}

const HeadToHead: React.FC = () => {
  const [data, setData] = useState<HeadToHeadData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeadToHead = async () => {
      try {
        const response = await fetch("/api/olympique/head-to-head");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const fetchedData: HeadToHeadData = await response.json();
        setData(fetchedData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHeadToHead();
  }, []);

  const getMatchResult = (
    match: Match,
    teamId: number
  ): "win" | "draw" | "loss" => {
    // Utiliser result_info si disponible (plus fiable)
    if (match.result_info) {
      const resultLower = match.result_info.toLowerCase();

      // Récupérer le nom de l'équipe
      const team = match.participants?.find((p) => p.id === teamId);
      const teamName = team?.name || "";

      if (
        resultLower.includes(teamName.toLowerCase()) &&
        resultLower.includes("won")
      ) {
        return "win";
      }
      if (resultLower.includes("draw")) {
        return "draw";
      }
      // Si result_info mentionne qu'une équipe a gagné et ce n'est pas nous
      if (resultLower.includes("won")) {
        return "loss";
      }
    }

    // Fallback sur les scores
    const teamScore = match.scores?.find((s) => s.participant_id === teamId);
    const opponentScore = match.scores?.find(
      (s) => s.participant_id !== teamId
    );

    if (!teamScore || !opponentScore) return "draw";

    const goals = teamScore.score?.goals ?? 0;
    const opponentGoals = opponentScore.score?.goals ?? 0;

    if (goals > opponentGoals) return "win";
    if (goals < opponentGoals) return "loss";
    return "draw";
  };

  const renderFormBadges = (matches: Match[], teamId: number) => {
    return (
      <div className={styles.formBadges}>
        {matches.slice(0, 5).map((match, index) => {
          const result = getMatchResult(match, teamId);
          return (
            <div
              key={index}
              className={`${styles.badge} ${styles[result]}`}
              title={
                result === "win"
                  ? "Victoire"
                  : result === "draw"
                  ? "Nul"
                  : "Défaite"
              }
            />
          );
        })}
      </div>
    );
  };

  const renderH2HBadges = (matches: Match[]) => {
    return (
      <div className={styles.h2hBadges}>
        {matches.slice(0, 5).map((match, index) => {
          const result = getMatchResult(match, 44); // Du point de vue de l'OM (id: 44)
          return (
            <div
              key={index}
              className={`${styles.badge} ${styles[result]}`}
              title={
                result === "win"
                  ? "Victoire OM"
                  : result === "draw"
                  ? "Nul"
                  : "Défaite OM"
              }
            />
          );
        })}
      </div>
    );
  };

  if (loading) {
    return <div className={styles.loading}>Chargement...</div>;
  }

  if (error || !data) {
    return <div className={styles.error}>{error || "Erreur"}</div>;
  }

  const omTeam = data.nextMatch.participants?.find((p) => p.id === 44);
  const opponentTeam = data.nextMatch.participants?.find((p) => p.id !== 44);

  return (
    <div className={styles.container}>
      <div className={styles.composant}>
        {/* Logos et VS */}
        <div className={styles.teamsContainer}>
          <div className={styles.teamSection}>
            {omTeam?.image_path && (
              <Image
                src={omTeam.image_path}
                alt={omTeam.name}
                width={60}
                height={60}
                className={styles.teamLogo}
              />
            )}
            {renderFormBadges(data.omForm, 44)}
          </div>

          <div className={styles.vsSection}>
            <div className={styles.vsIcon}>VS</div>
            {data.nextMatch.venue && (
              <div className={styles.venueInfo}>
                {data.nextMatch.venue.name}
              </div>
            )}
          </div>

          <div className={styles.teamSection}>
            {opponentTeam?.image_path && (
              <Image
                src={opponentTeam.image_path}
                alt={opponentTeam.name}
                width={60}
                height={60}
                className={styles.teamLogo}
              />
            )}
            {renderFormBadges(data.opponentForm, data.opponentId)}
          </div>
        </div>

        {/* Confrontations directes */}
        <div className={styles.h2hSection}>
          {renderH2HBadges(data.headToHead)}
        </div>
      </div>
    </div>
  );
};

export default HeadToHead;
