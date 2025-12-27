import React, { useState } from "react";
import styles from "@/styles/MainPage/MesProjets.module.css";

type Projet = { titre: string; description: string; lien?: string };
type Choix = "Entreprise E5" | "E6" | "Personnel";
const projetsData: Record<Choix, Projet[]> = {
  "Entreprise E5": [
    {
      titre: "Projet Entreprise 1",
      description: "Description du projet entreprise 1.",
      lien: "https://github.com",
    },
    {
      titre: "Projet Entreprise 2",
      description: "Description du projet entreprise 2.",
      lien: "https://linkedin.com",
    },
    {
      titre: "Projet Entreprise 3",
      description: "Description du projet entreprise 3.",
      lien: "https://twitter.com",
    },
  ],
  E6: [
    {
      titre: "Projet E6-1",
      description: "Description du projet E6-1.",
      lien: "https://github.com",
    },
    {
      titre: "Projet E6-2",
      description: "Description du projet E6-2.",
      lien: "https://linkedin.com",
    },
    {
      titre: "Projet E6-3",
      description: "Description du projet E6-3.",
      lien: "https://twitter.com",
    },
  ],
  Personnel: [
    {
      titre: "Projet Perso 1",
      description: "Description du projet personnel 1.",
      lien: "https://github.com",
    },
    {
      titre: "Projet Perso 2",
      description: "Description du projet personnel 2.",
      lien: "https://linkedin.com",
    },
    {
      titre: "Projet Perso 3",
      description: "Description du projet personnel 3.",
      lien: "https://twitter.com",
    },
  ],
};

const choixList: Choix[] = ["Entreprise E5", "E6", "Personnel"];

export default function MesProjets() {
  const [choix, setChoix] = useState<Choix>("Entreprise E5");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const projets = projetsData[choix];

  const handleChoix = (c: Choix) => {
    setChoix(c);
    setCarouselIndex(0);
  };

  const handleNav = (idx: number) => {
    setCarouselIndex(idx);
  };

  return (
    <div className={styles.mesProjets}>
      <div className={styles.choix}>
        {choixList.map((c) => (
          <button
            key={c}
            className={`${styles.choixButton} ${
              choix === c ? styles.active : ""
            }`}
            onClick={() => handleChoix(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className={styles.carousel}>
        <a
          href={projets[carouselIndex].lien || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.carouselContent}
          style={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          <h3>{projets[carouselIndex].titre}</h3>
          <p>{projets[carouselIndex].description}</p>
        </a>
        <div className={styles.carouselNav}>
          {projets.map((_: Projet, idx: number) => (
            <button
              key={idx}
              className={`${styles.carouselNavButton} ${
                carouselIndex === idx ? styles.active : ""
              }`}
              onClick={() => handleNav(idx)}
              aria-label={`Voir projet ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
