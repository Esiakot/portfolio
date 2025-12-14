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
      <div className={styles.overlayContainer}></div>
      <div className={styles.sectionContainer}>
        <div className={styles.leftSection}>
          <div className={styles.topImage}>
            <Image
              src="/MainPage/basquiat.jpg"
              alt="Top Image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.middleImage}>
            <Image
              src="/MainPage/roley.webp"
              alt="Middle Image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.bottomImage}>
            <Image
              src="/MainPage/berlin.jpg"
              alt="Bottom Image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className={styles.centerSection}>
          <Image
            src="/MainPage/entreprise.jpg"
            alt="Center Logo"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className={styles.rightSection}>
          <Image
            src="/MainPage/world.jpg"
            alt="Right Image"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
