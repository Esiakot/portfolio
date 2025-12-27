"use client";

import styles from "@/styles/MainPage/MainPage.module.css";
import Apropos from "./Apropos";
import MesProjets from "./MesProjets";
import Contact from "./Contact";
import { Genos } from "next/font/google";
import Image from "next/image";
import React, { useRef } from "react";

const genos = Genos({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function MainPage() {
  const aproposRef = useRef<HTMLDivElement>(null);
  const projetsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      const yOffset = -window.innerHeight * 0.12; // 12vh offset
      const y =
        ref.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className={`${styles.mainPage} ${genos.className}`}>
      <div className={styles.overlayContainer}></div>
      <div className={styles.sectionContainer}>
        <div className={`${styles.container} ${styles.leftContainer}`}>
          <span
            className={styles.title}
            style={{ cursor: "pointer" }}
            onClick={() => scrollToSection(aproposRef)}
          >
            Qui suis-je ?
          </span>
          <div className={styles.section}>
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
        </div>
        <div className={`${styles.container} ${styles.centerContainer}`}>
          <span
            className={styles.title}
            style={{ cursor: "pointer" }}
            onClick={() => scrollToSection(projetsRef)}
          >
            Mes projets
          </span>
          <div className={styles.section}>
            <Image
              src="/MainPage/room.png"
              alt="Center Logo"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <div className={`${styles.container} ${styles.rightContainer}`}>
          <span
            className={styles.title}
            style={{ cursor: "pointer" }}
            onClick={() => scrollToSection(contactRef)}
          >
            Contact
          </span>
          <div className={styles.section}>
            <Image
              src="/MainPage/world.jpg"
              alt="Right Image"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>{" "}
        </div>{" "}
      </div>

      <div ref={aproposRef} className={styles.sectionAnchor}>
        <Apropos />
      </div>
      <div ref={projetsRef} className={styles.sectionAnchor}>
        <MesProjets />
      </div>
      <div ref={contactRef} className={styles.sectionAnchor}>
        <Contact />
      </div>
    </div>
  );
}
