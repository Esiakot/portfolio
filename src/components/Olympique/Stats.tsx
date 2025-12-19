import styles from "@/styles/Olympique/Stats.module.css";
import Image from "next/image";
import React from "react";
import Schedules from "./Schedules";
import LastGame from "./LastGame";
import HeadToHead from "./HeadToHead";
import Standings from "./Standings";
import TopPlayers from "./TopPlayers";

export default function Stats() {
  return (
    <div className={styles.container}>
      <Image
        className={styles.image}
        src="/vel.webp"
        alt="Stadium"
        fill
        priority
      />
      <div className={styles.overlay} />
      <div className={styles.leftContainer}>
        <LastGame />
        <HeadToHead />
      </div>
      <Standings />
      <div className={styles.rightContainer}>
        <Schedules />
        <TopPlayers />
      </div>
    </div>
  );
}
