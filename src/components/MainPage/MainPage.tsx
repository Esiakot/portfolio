"use client";

import styles from "@/styles/MainPage/MainPage.module.css";
import { Genos } from "next/font/google";
import Image from "next/image";
import React from "react";

const genos = Genos({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
});

export default function MainPage() {
  return (
    <div className={`${styles.mainPage} ${genos.className}`}>
      <div className={styles.overlayContainer}></div>
      <div className={styles.sectionContainer}>
        <div className={`${styles.container} ${styles.leftContainer}`}>
          <span className={styles.title}>Qui suis-je ?</span>
          <div className={styles.section}>
            {" "}
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
          </div>{" "}
        </div>
        <div className={`${styles.container} ${styles.centerContainer}`}>
          <span className={styles.title}>Mes projets</span>
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
          <span className={styles.title}>Contact</span>
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
      <div className={styles.apropos}>
        <div className={styles.aproposContent}>
          <div className={styles.aproposHeadContent}>
            <h2 className={styles.aproposTitle}>À propos de moi :</h2>{" "}
            <div className={styles.aproposDescription}>
              Hey, moi c'est Tony, je suis passionné par l'informatique. Mon
              cursus est un BTS SIO option SLAM, que j'effectue à l'ICFA de
              Montpellier en alternance chez Symetrie dans son service SI.
            </div>
          </div>
          <div className={styles.aproposDetails}>
            <div className={styles.separatorLine}></div>
            <div className={styles.aproposCompetences}>
              <h2 className={styles.aproposCompetencesTitle}>
                Compétences clées:
              </h2>
              <div className={styles.competencesLogos}>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/HTML-5-Badge-Logo.png"
                    alt="HTML5"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/Official_CSS_Logo.svg"
                    alt="CSS"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/Javascript-736400_960_720.png"
                    alt="JavaScript"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/Typescript.svg.png"
                    alt="TypeScript"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/nextjs-icon-dark-background.png"
                    alt="Next.js"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/PHP-logo.svg"
                    alt="PHP"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/Python-logo-notext.svg.png"
                    alt="Python"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/MySQL.svg"
                    alt="MySQL"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/docker.png"
                    alt="Docker"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/WordPress-logotype-wmark.png"
                    alt="WordPress"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
              <h2 className={styles.aproposCompetencesTitle}>Logiciels:</h2>
              <div className={styles.competencesLogos}>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/Visual_Studio_Code_1.35_icon.svg.png"
                    alt="VS Code"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/DBeaver_logo.svg"
                    alt="DBeaver"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/VirtualBox_2024_Logo.svg.png"
                    alt="VirtualBox"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/Kubuntu_logo.svg.png"
                    alt="Kubuntu"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
                <div className={styles.logoItem}>
                  <Image
                    src="/MainPage/logo/Windows_logo_-_2021.svg.png"
                    alt="Windows"
                    width={50}
                    height={50}
                    style={{
                      objectFit: "contain",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </div>
            </div>{" "}
            <div className={styles.separatorLine}></div>
            <div className={styles.aproposHobbies}>
              <div className={styles.aproposHobbiesImage}>
                <Image
                  src="/MainPage/berlin.jpg"
                  alt="Berlin"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className={styles.aproposHobbiesImage}>
                <Image
                  src="/MainPage/roley.webp"
                  alt="Roley"
                  fill
                  style={{ objectFit: "cover", objectPosition: "top" }}
                />
              </div>
              <div className={styles.aproposHobbiesImage}>
                <Image
                  src="/MainPage/basquiat.jpg"
                  alt="Basquiat"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
