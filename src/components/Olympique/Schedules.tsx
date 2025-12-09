"use client";

import styles from "@/styles/Olympique/Schedules.module.css";
import { Genos } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const genos = Genos({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

interface Participant {
  id: number;
  name: string;
  short_code: string;
  image_path: string;
  meta: {
    location: string;
    winner: boolean | null;
  };
}

interface Score {
  type_id: number;
  participant_id: number;
  score: {
    goals: number;
  };
  description: string;
}

interface Fixture {
  id: number;
  name: string;
  starting_at: string;
  result_info: string | null;
  state_id: number;
  participants: Participant[];
  scores: Score[];
}

interface Round {
  id: number;
  name: string;
  finished: boolean;
  is_current: boolean;
  starting_at: string;
  fixtures: Fixture[];
}

interface Stage {
  id: number;
  name: string;
  rounds: Round[];
}

interface ScheduleData {
  data: Stage[];
}

export default function Schedules() {
  const [schedule, setSchedule] = useState<ScheduleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("/api/schedule");

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }

        const data = await response.json();
        setSchedule(data);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  if (loading) {
    return (
      <div className={`${styles.loading} ${genos.className}`}>
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${styles.error} ${genos.className}`}>
        Erreur: {error}
      </div>
    );
  }

  const allMatches: Fixture[] = [];
  if (schedule?.data?.[0]?.rounds) {
    schedule.data[0].rounds.forEach((round) => {
      round.fixtures.forEach((fixture) => {
        allMatches.push(fixture);
      });
    });
  }

  const now = new Date();

  const upcomingMatches = allMatches
    .filter((match) => new Date(match.starting_at) > now)
    .sort(
      (a, b) =>
        new Date(a.starting_at).getTime() - new Date(b.starting_at).getTime()
    )
    .slice(0, 5);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const parisDate = new Date(date.getTime() + 60 * 60 * 1000);

    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(parisDate);
  };

  return (
    <div className={`${styles.schedules} ${genos.className}`}>
      {upcomingMatches.map((match) => {
        const homeTeam = match.participants.find(
          (p) => p.meta.location === "home"
        );
        const awayTeam = match.participants.find(
          (p) => p.meta.location === "away"
        );

        return (
          <div key={match.id} className={styles.matchCard}>
            <div className={styles.team}>
              {homeTeam?.image_path && (
                <Image
                  src={homeTeam.image_path}
                  alt={homeTeam.name}
                  width={30}
                  height={30}
                  className={styles.teamLogo}
                />
              )}
              <span className={styles.teamName}>{homeTeam?.name}</span>
            </div>
            <div className={styles.matchDate}>
              {formatDate(match.starting_at)}
              <span className={styles.vs}>VS</span>
            </div>
            <div className={styles.team}>
              {awayTeam?.image_path && (
                <Image
                  src={awayTeam.image_path}
                  alt={awayTeam.name}
                  width={30}
                  height={30}
                  className={styles.teamLogo}
                />
              )}
              <span className={styles.teamName}>{awayTeam?.name}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
