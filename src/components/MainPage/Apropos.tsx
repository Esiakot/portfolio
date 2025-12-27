import styles from "@/styles/MainPage/Apropos.module.css";
import Image from "next/image";
import React from "react";

export default function Apropos() {
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
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/HTMLLogo.png"
                  alt="HTML5"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>HTML</h2>
                  <h2 className={styles.logoItemDescription}>Mise en forme</h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/Official_CSS_Logo.svg"
                  alt="CSS"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>CSS</h2>
                  <h2 className={styles.logoItemDescription}>
                    Feuille de style
                  </h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/Javascript-736400_960_720.png"
                  alt="JavaScript"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>Javascript</h2>
                  <h2 className={styles.logoItemDescription}>
                    Langage de programation
                  </h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/Typescript.svg.png"
                  alt="TypeScript"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>TypeScript</h2>
                  <h2 className={styles.logoItemDescription}>
                    Langage de programation
                  </h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/next-js.svg"
                  alt="Next.js"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>Next.js</h2>
                  <h2 className={styles.logoItemDescription}>Framework</h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/Mariadb.png"
                  alt="MariaDB"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>MariaDB</h2>
                  <h2 className={styles.logoItemDescription}>
                    Base de données
                  </h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/PHP-logo.svg"
                  alt="PHP"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>PHP</h2>
                  <h2 className={styles.logoItemDescription}>
                    Langage de programation
                  </h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/Python-logo-notext.svg.png"
                  alt="Python"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>Python</h2>
                  <h2 className={styles.logoItemDescription}>
                    Langage de programation
                  </h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/docker.png"
                  alt="Docker"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>Docker</h2>
                  <h2 className={styles.logoItemDescription}>
                    Conteneurisation
                  </h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/VirtualBox_2024_Logo.svg.png"
                  alt="VirtualBox"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>VirtualBox</h2>
                  <h2 className={styles.logoItemDescription}>Virtualisation</h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/Visual_Studio_Code_1.35_icon.svg.png"
                  alt="VS Code"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>VS Code</h2>
                  <h2 className={styles.logoItemDescription}>IDE</h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/DBeaver_logo.svg"
                  alt="DBeaver"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>DBeaver</h2>
                  <h2 className={styles.logoItemDescription}>IDE BDD</h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/git.svg"
                  alt="WordPress"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>GitHub</h2>
                  <h2 className={styles.logoItemDescription}>Juste GitHub</h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/fig.png"
                  alt="Kubuntu"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>Figma</h2>
                  <h2 className={styles.logoItemDescription}>Design UI/UX</h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/Kubuntu_logo.svg.png"
                  alt="Kubuntu"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>Kubuntu</h2>
                  <h2 className={styles.logoItemDescription}>
                    Système d'exploitation
                  </h2>
                </div>
              </div>
              <div className={styles.logoItem}>
                <Image
                  src="/MainPage/logo/Windows_logo_-_2021.svg.png"
                  alt="Windows"
                  width={50}
                  height={50}
                  className={styles.logoItemImage}
                />
                <div className={styles.logoItemText}>
                  <h2 className={styles.logoItemTitle}>Windows</h2>
                  <h2 className={styles.logoItemDescription}>
                    Système d'exploitation
                  </h2>
                </div>
              </div>
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
