"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styles from "@/styles/Olympique/Match/MatchDetail.module.css";

interface Score {
  description: string;
  participant_id: number;
  score: {
    goals: number;
  };
}

interface Participant {
  id: number;
  name: string;
  image_path: string;
  meta?: {
    location?: string;
  };
}

interface Statistic {
  value?: number;
  participant_id: number;
  location: string;
  data?: {
    value: number;
  };
  type: {
    id: number;
    name: string;
  };
}

interface Event {
  id: number;
  type_id: number;
  minute: number;
  extra_minute?: number;
  participant_id: number;
  player_id: number;
  related_player_id?: number;
  section: string;
  player_name?: string;
  result?: string;
  type: {
    name: string;
  };
}

interface MatchData {
  id: number;
  name: string;
  starting_at: string;
  result_info?: string;
  participants: Participant[];
  scores: Score[];
  statistics: Statistic[];
  events?: Event[];
  league?: {
    name: string;
    image_path: string;
  };
  round?: {
    name: string;
  };
  venue?: {
    name: string;
    city_name: string;
  };
}

const MatchDetail: React.FC = () => {
  const params = useParams();
  const matchId = params?.id as string;

  const [match, setMatch] = useState<MatchData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        const response = await fetch(`/api/olympique/match/${matchId}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération du match");
        }
        const data = await response.json();
        setMatch(data.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
      } finally {
        setLoading(false);
      }
    };

    if (matchId) {
      fetchMatchDetails();
    }
  }, [matchId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div style={{ padding: "2rem", textAlign: "center", color: "#00b4d8" }}>
          Chargement...
        </div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className={styles.container}>
        <div style={{ padding: "2rem", textAlign: "center", color: "#ff6b6b" }}>
          {error || "Match introuvable"}
        </div>
      </div>
    );
  }

  const homeTeam = match.participants[0];
  const awayTeam = match.participants[1];
  const homeScore = match.scores?.find(
    (s) => s.description === "CURRENT" && s.participant_id === homeTeam.id
  );
  const awayScore = match.scores?.find(
    (s) => s.description === "CURRENT" && s.participant_id === awayTeam.id
  );

  const getStatsByType = (statType: string) => {
    const stats = match.statistics?.filter((s) => s.type.name === statType);
    if (!stats || stats.length === 0) return null;

    const homeStat = stats.find((s) => s.participant_id === homeTeam.id);
    const awayStat = stats.find((s) => s.participant_id === awayTeam.id);

    return {
      home: homeStat?.data?.value ?? homeStat?.value ?? 0,
      away: awayStat?.data?.value ?? awayStat?.value ?? 0,
    };
  };

  const statCategories = [
    {
      title: "Possession & Tirs",
      stats: [
        "Ball Possession %",
        "Shots Total",
        "Shots On Target",
        "Shots Off Target",
        "Shots Blocked",
      ],
    },
    {
      title: "Passes & Jeu",
      stats: [
        "Passes Total",
        "Passes Accurate",
        "Passes %",
        "Attacks",
        "Dangerous Attacks",
      ],
    },
    {
      title: "Discipline",
      stats: ["Corners", "Fouls", "Yellow Cards", "Red Cards", "Offsides"],
    },
    {
      title: "Défense",
      stats: ["Tackles", "Saves", "Goalkeeper Saves", "Goal Kicks"],
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.matchHeader}>
        <div className={styles.leagueInfo}>
          {match.league && (
            <>
              <img
                src={match.league.image_path}
                alt={match.league.name}
                className={styles.leagueLogo}
              />
              <span>{match.league.name}</span>
            </>
          )}
          {match.round && <span> - {match.round.name}</span>}
        </div>

        <div className={styles.matchDate}>
          {new Date(match.starting_at).toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        {match.venue && (
          <div className={styles.venue}>
            📍 {match.venue.name}, {match.venue.city_name}
          </div>
        )}
      </div>

      <div className={styles.scoreBoard}>
        <div className={styles.teamSection}>
          <img
            src={homeTeam.image_path}
            alt={homeTeam.name}
            className={styles.teamLogo}
          />
          <h2 className={styles.teamName}>{homeTeam.name}</h2>
          {homeTeam.meta?.location && (
            <span className={styles.location}>
              {homeTeam.meta.location === "home"
                ? "🏠 Domicile"
                : "✈️ Extérieur"}
            </span>
          )}
        </div>

        <div className={styles.scoreSection}>
          <div className={styles.score}>
            <span className={styles.scoreNumber}>
              {homeScore?.score.goals ?? 0}
            </span>
            <span className={styles.scoreSeparator}>-</span>
            <span className={styles.scoreNumber}>
              {awayScore?.score.goals ?? 0}
            </span>
          </div>
          {match.result_info && (
            <div className={styles.resultInfo}>{match.result_info}</div>
          )}
        </div>

        <div className={styles.teamSection}>
          <img
            src={awayTeam.image_path}
            alt={awayTeam.name}
            className={styles.teamLogo}
          />
          <h2 className={styles.teamName}>{awayTeam.name}</h2>
          {awayTeam.meta?.location && (
            <span className={styles.location}>
              {awayTeam.meta.location === "home"
                ? "🏠 Domicile"
                : "✈️ Extérieur"}
            </span>
          )}
        </div>
      </div>

      <div className={styles.statsWrapper}>
        <h2 className={styles.sectionTitle}>Statistiques du match</h2>

        {statCategories.map((category) => (
          <div key={category.title} className={styles.statCategory}>
            <h3 className={styles.categoryTitle}>{category.title}</h3>
            <div className={styles.statsGrid}>
              {category.stats.map((statType) => {
                const stats = getStatsByType(statType);
                if (!stats) return null;

                const total = stats.home + stats.away;
                const homePercentage =
                  total > 0 ? (stats.home / total) * 100 : 50;

                return (
                  <div key={statType} className={styles.statRow}>
                    <div className={styles.statHeader}>
                      <span className={styles.statValueHome}>{stats.home}</span>
                      <span className={styles.statLabel}>{statType}</span>
                      <span className={styles.statValueAway}>{stats.away}</span>
                    </div>
                    <div className={styles.statBar}>
                      <div
                        className={styles.statBarHome}
                        style={{ width: `${homePercentage}%` }}
                      />
                      <div
                        className={styles.statBarAway}
                        style={{ width: `${100 - homePercentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {match.events && match.events.length > 0 && (
        <div className={styles.eventsWrapper}>
          <h2 className={styles.sectionTitle}>Événements du match</h2>
          <div className={styles.eventsList}>
            {match.events
              .sort((a, b) => a.minute - b.minute)
              .map((event) => (
                <div
                  key={event.id}
                  className={`${styles.eventItem} ${
                    event.participant_id === homeTeam.id
                      ? styles.homeEvent
                      : styles.awayEvent
                  }`}
                >
                  <span className={styles.eventTime}>
                    {event.minute}
                    {event.extra_minute ? `+${event.extra_minute}` : ""}'
                  </span>
                  <span className={styles.eventType}>{event.type.name}</span>
                  {event.player_name && (
                    <span className={styles.eventPlayer}>
                      {event.player_name}
                    </span>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDetail;
