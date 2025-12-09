"use client";

import styles from "@/styles/MainPage/MainPage.module.css";
import { Amarante } from "next/font/google";
import Image from "next/image";
import React from "react";

const amarante = Amarante({
  weight: "400",
  subsets: ["latin"],
});

export default function MainPage() {
  return (
    <div className={`${styles.mainPage} ${amarante.className}`}>
      <div className={styles.menu}>
        <div className={styles.logoWrapper}>
          <Image
            className={styles.logo}
            src="/logo.jpeg"
            alt="Logo"
            width={200}
            height={200}
          />
        </div>
        <div className={styles.menuItems}>
          <div className={styles.duoContainer1}>
            <div
              className={`${styles.bottom} ${styles.bottom1} ${styles.duo1}`}
            ></div>
            <div className={`${styles.top} ${styles.duo1}`}></div>
            <div className={styles.menuText}>accueil</div>
          </div>

          <div className={styles.duoContainer2}>
            <div className={`${styles.bottom} ${styles.duo2}`}></div>
            <div className={`${styles.top} ${styles.duo2}`}></div>
            <div className={styles.menuText}>à propos</div>
          </div>

          <div className={styles.duoContainer3}>
            <div className={`${styles.bottom} ${styles.duo3}`}></div>
            <div className={`${styles.top} ${styles.duo3}`}></div>
            <div className={styles.menuText}>portfolio</div>
          </div>

          <div className={styles.duoContainer4}>
            <div className={`${styles.bottom} ${styles.duo4}`}></div>
            <div className={`${styles.top} ${styles.duo4}`}></div>
            <div className={styles.menuText}>contact</div>
          </div>
        </div>
      </div>

      <div className={styles.content}></div>
    </div>
  );
}
