import styles from "@/styles/MainPage/Apropos.module.css";
import Image from "next/image";
import React, { useState } from "react";

interface Competence {
  id: string;
  title: string;
  description: string;
  logo: string;
  details: string;
}

const competences: Competence[] = [
  {
    id: "javascript",
    title: "Javascript",
    description: "Langage de programation",
    logo: "/MainPage/logo/Javascript-736400_960_720.png",
    details:
      "Utilisation de JavaScript pour le développement front-end et back-end. Création d'interactions dynamiques sur les pages web et développement d'applications avec Node.js.",
  },
  {
    id: "typescript",
    title: "TypeScript",
    description: "Langage de programation",
    logo: "/MainPage/logo/Typescript.svg.png",
    details:
      "Adoption de TypeScript pour un typage statique fort, améliorant la maintenabilité du code et réduisant les erreurs. Utilisé dans mes projets Next.js et Node.js.",
  },
  {
    id: "nextjs",
    title: "Next.js",
    description: "Framework",
    logo: "/MainPage/logo/next-js.svg",
    details:
      "Développement de ce portfolio avec Next.js. Maîtrise du routing, du SSR, des API routes et de l'optimisation des performances.",
  },
  {
    id: "mariadb",
    title: "MariaDB",
    description: "Base de données",
    logo: "/MainPage/logo/Mariadb.png",
    details:
      "Conception et gestion de bases de données relationnelles. Écriture de requêtes SQL complexes et optimisation des performances pour les projets ETL chez SYMETRIE.",
  },
  {
    id: "php",
    title: "PHP",
    description: "Langage de programation",
    logo: "/MainPage/logo/PHP-logo.svg",
    details:
      "Développement back-end avec PHP, création d'APIs REST et intégration avec des bases de données MySQL/MariaDB.",
  },
  {
    id: "python",
    title: "Python",
    description: "Langage de programation",
    logo: "/MainPage/logo/Python-logo-notext.svg.png",
    details:
      "Développement d'ETLs et de scripts d'automatisation chez SYMETRIE. Manipulation de données avec pandas et création de scripts de traitement batch.",
  },
  {
    id: "docker",
    title: "Docker",
    description: "Conteneurisation",
    logo: "/MainPage/logo/docker.png",
    details:
      "Conteneurisation d'applications pour faciliter le déploiement et assurer la cohérence entre les environnements de développement et de production.",
  },
  {
    id: "virtualbox",
    title: "VirtualBox",
    description: "Virtualisation",
    logo: "/MainPage/logo/VirtualBox_2024_Logo.svg.png",
    details:
      "Création et gestion de machines virtuelles pour tester différents environnements et systèmes d'exploitation dans un cadre sécurisé.",
  },
  {
    id: "vscode",
    title: "VS Code",
    description: "IDE",
    logo: "/MainPage/logo/Visual_Studio_Code_1.35_icon.svg.png",
    details:
      "Mon IDE principal pour le développement. Maîtrise des extensions, du débogage et des raccourcis pour une productivité optimale.",
  },
  {
    id: "dbeaver",
    title: "DBeaver",
    description: "IDE BDD",
    logo: "/MainPage/logo/DBeaver_logo.svg",
    details:
      "Utilisation de DBeaver pour la gestion et l'exploration des bases de données, la visualisation des schémas et l'exécution de requêtes SQL.",
  },
  {
    id: "github",
    title: "GitHub",
    description: "Juste GitHub",
    logo: "/MainPage/logo/git.svg",
    details:
      "Gestion de versions avec Git et GitHub. Collaboration en équipe, gestion des branches, pull requests et intégration continue.",
  },
  {
    id: "figma",
    title: "Figma",
    description: "Design UI/UX",
    logo: "/MainPage/logo/fig.png",
    details:
      "Conception d'interfaces utilisateur et de maquettes. Prototypage interactif et collaboration avec les équipes de développement.",
  },
];

export default function Apropos() {
  const [selectedCompetence, setSelectedCompetence] = useState<string | null>(
    null
  );

  const handleCompetenceClick = (id: string) => {
    setSelectedCompetence(selectedCompetence === id ? null : id);
  };

  const selectedDetails = competences.find((c) => c.id === selectedCompetence);

  return (
    <div className={styles.apropos}>
      <div className={styles.aproposContent}>
        <div className={styles.aproposHeadContent}>
          <h2 className={styles.aproposTitle}>À propos de moi :</h2>
          <p className={styles.aproposDescription}>
            Hey, moi c'est Tony, je suis passionné par l'informatique. Mon
            cursus est un BTS SIO option SLAM, que j'effectue à l'ICFA de
            Montpellier en alternance chez SYMETRIE dans son SI notamment à
            travers des projets tel que des ETLs ou un site-web interne.
          </p>
        </div>
        <div className={styles.aproposDetails}>
          <div className={styles.separatorLine}></div>
          <div className={styles.aproposCompetences}>
            <div className={styles.competencesLogos}>
              {competences.map((comp) => (
                <div
                  key={comp.id}
                  className={`${styles.logoItem} ${
                    selectedCompetence === comp.id ? styles.logoItemActive : ""
                  }`}
                  onClick={() => handleCompetenceClick(comp.id)}
                >
                  <Image
                    src={comp.logo}
                    alt={comp.title}
                    width={50}
                    height={50}
                    className={styles.logoItemImage}
                  />
                  <div className={styles.logoItemText}>
                    <h2 className={styles.logoItemTitle}>{comp.title}</h2>
                    <h2 className={styles.logoItemDescription}>
                      {comp.description}
                    </h2>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.aproposDetailsParcours}>
              {selectedDetails ? (
                <div className={styles.detailsContent}>
                  <div className={styles.detailsHeader}>
                    <Image
                      src={selectedDetails.logo}
                      alt={selectedDetails.title}
                      width={60}
                      height={60}
                      className={styles.detailsLogo}
                    />
                    <h3 className={styles.detailsTitle}>
                      {selectedDetails.title}
                    </h3>
                  </div>
                  <p className={styles.detailsText}>
                    {selectedDetails.details}
                  </p>
                </div>
              ) : (
                <div className={styles.detailsPlaceholder}>
                  <p>Cliquez sur une compétence pour voir les détails</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.separatorLine}></div>
          <div className={styles.aproposHobbies}>
            <div className={styles.aproposHobbiesImage}>
              <p className={styles.aproposHobbiesDescription}>
                L'histoire, en particulier moderne et contemporaine
              </p>
              <Image
                src="/MainPage/berlin.jpg"
                alt="Berlin"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className={styles.aproposHobbiesImage}>
              <p className={styles.aproposHobbiesDescription}>
                2007, mon premier match au Stade Vélodrome face à Sochaux,
                victoire 4/2. Une passion intacte et toujours plus forte d'année
                en année.
              </p>
              <Image
                src="/MainPage/roley.webp"
                alt="Roley"
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div className={styles.aproposHobbiesImage}>
              <p className={styles.aproposHobbiesDescription}>
                L'art sous toutes ses formes, une source d'inspiration
                inépuisable.
              </p>
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
  );
}
