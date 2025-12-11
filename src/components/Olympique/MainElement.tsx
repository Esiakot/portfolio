"use client";

import styles from "@/styles/Olympique/MainElement.module.css";
import Header from "@/components/Olympique/Common/Header";
import { Genos } from "next/font/google";
import Image from "next/image";
import { useState, useEffect } from "react";

const genos = Genos({
  weight: "400",
  subsets: ["latin"],
});

const images = [
  "/green.webp",
  "/robi.webp",
  "/auba.webp",
  "/roley.webp",
  "/team.webp",
];

const getImageClass = (index: number) => {
  switch (images[index]) {
    case "/green.webp":
      return styles.imageGreen;
    case "/robi.webp":
      return styles.imageFlag;
    case "/auba.webp":
      return styles.imageAuba;
    case "/team.webp":
      return styles.imageTeam;
    case "/roley.webp":
      return styles.imageRoley;
  }
};

export default function MainElement() {
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection("right");
    setPrevIndex(index);
    setIndex((i) => (i + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const goToPrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setDirection("left");
    setPrevIndex(index);
    setIndex((i) => (i - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 6000);

    return () => clearInterval(interval);
  }, [index, isTransitioning]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [index, isTransitioning]);

  return (
    <div className={`${styles.container} ${genos.className}`}>
      <Header />

      <div className={styles.carousel}>
        {isTransitioning && (
          <Image
            className={`${styles.image} ${getImageClass(prevIndex)} ${
              styles.imagePrev
            }`}
            src={images[prevIndex]}
            alt="Olympique Previous"
            fill
            priority
          />
        )}
        <Image
          className={`${styles.image} ${getImageClass(index)} ${
            isTransitioning
              ? direction === "right"
                ? styles.slideRight
                : styles.slideLeft
              : ""
          }`}
          src={images[index]}
          alt="Olympique Main"
          fill
          priority
        />

        <button
          className={`${styles.navButton} ${styles.navLeft}`}
          onClick={goToPrev}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className={`${styles.navButton} ${styles.navRight}`}
          onClick={goToNext}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className={styles.text}></div>

      <div className={styles.bottom}>
        <svg
          className={styles.logo}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 240.26566 185.20833"
          version="1.1"
          id="svg5"
        >
          <defs id="defs2" />
          <g id="layer1" transform="translate(-6.5632034,-28.586736)" />
          <g
            viewBox="0 0 48 37"
            id="puma-logo"
            transform="matrix(5.0055816,0,0,5.0055816,0.0019023,5.8406749e-4)"
          >
            <path
              fill="#003049"
              d="m 47.689,0.517 c -0.834,-1.066 -2.291,-0.213 -2.933,0.16 -4.569,2.692 -5.243,7.432 -6.834,10.154 -1.253,2.178 -3.304,3.779 -5.159,3.903 -1.373,0.098 -2.861,-0.167 -4.338,-0.81 -3.613,-1.562 -5.56,-3.583 -6.034,-3.94 -0.973,-0.739 -8.459,-8.03 -14.559,-8.327 0,0 -0.744,-1.5 -0.93,-1.526 C 6.457,0.08 6,1.033 5.669,1.133 5.369,1.238 4.844,0.109 4.539,0.158 4.233,0.2 3.936,1.33 3.34,1.913 2.901,2.338 2.367,2.311 2.065,2.839 1.961,3.031 1.997,3.369 1.879,3.679 1.626,4.32 0.777,4.387 0.769,5.073 0.769,5.835 1.483,5.98 2.107,6.511 2.603,6.936 2.637,7.236 3.216,7.435 3.731,7.611 4.48,7.061 5.144,7.258 5.697,7.421 6.229,7.537 6.348,8.104 6.456,8.617 6.348,9.42 5.666,9.33 5.444,9.3 4.472,8.982 3.271,9.11 1.821,9.264 0.166,9.728 0.004,11.33 c -0.083,0.895 1.028,1.942 2.11,1.733 0.742,-0.143 0.392,-1.013 0.797,-1.433 0.535,-0.541 3.545,1.888 6.344,1.888 1.186,0 2.063,-0.3 2.935,-1.21 0.078,-0.057 0.185,-0.203 0.31,-0.218 0.113,0.015 0.324,0.128 0.39,0.175 2.262,1.793 3.967,5.399 12.26,5.441 1.164,0.014 2.498,0.558 3.591,1.553 0.96,0.866 1.528,2.251 2.075,3.65 0.836,2.106 2.322,4.139 4.584,6.407 0.119,0.135 1.98,1.561 2.119,1.666 0.025,0.021 0.168,0.334 0.106,0.51 -0.039,1.38 -0.245,5.34 2.731,5.506 0.731,0.04 0.549,-0.463 0.549,-0.82 -0.01,-0.683 -0.129,-1.371 0.226,-2.08 0.507,-0.957 -1.051,-1.418 -1.017,-3.513 0.037,-1.567 -1.291,-1.302 -1.969,-2.498 -0.381,-0.687 -0.736,-1.065 -0.699,-1.894 0.145,-4.76 -1.034,-7.896 -1.61,-8.654 -0.455,-0.587 -0.847,-0.806 -0.414,-1.078 2.481,-1.632 3.05,-3.15 3.05,-3.15 1.32,-3.081 2.512,-5.89 4.15,-7.138 0.332,-0.241 1.177,-0.88 1.703,-1.12 1.527,-0.725 2.346,-1.156 2.777,-1.576 0.711,-0.675 1.27,-2.107 0.588,-2.96 z"
              id="path167"
            />
          </g>
        </svg>
        Partenaire majeur
        <svg
          className={styles.logo}
          xmlns="http://www.w3.org/2000/svg"
          version="1.2"
          baseProfile="tiny"
          x="0px"
          y="0px"
          viewBox="0 0 536 327"
        >
          <g id="CMA_CGM">
            <g>
              <g>
                <path
                  fill="#003049"
                  d="M300.5,35.8c3.8-3,20.5-17.9,28.8-28.1c0.6-0.8,0.2-1.9-0.7-2.2c-43.7-12.7-176-0.4-238.8,94.7     c-0.9,1.3-0.7,1.7,0.3,2.5c21.9-35.5,71.6-63.4,131.7-69.2c24.7-2.4,49.9-0.4,74.7,3.9C298.9,37.6,298.8,37.2,300.5,35.8z"
                />
                <g>
                  <g>
                    <path
                      fill="#003049"
                      d="M239.3,201.2h17.5l-30.9-75h-22.8l-30.9,75h17l5-13h40L239.3,201.2z M200.3,174.2l13.9-36.3l13.9,36.3       H200.3z"
                    />
                    <path
                      fill="#003049"
                      d="M127.5,193.2l19.1-31.9c0.7-1.2,4.4-7.6,5.6-10.1h0.2c-0.2,2.8-0.2,7.8-0.2,10.1v39.9h16v-75h-15.3       l-24.3,40.2l-24.3-40.2H86.2v75h16v-39.9c0-2.3-0.1-7.2-0.2-10.1h0.2c1.2,2.4,4.9,8.9,5.6,10.1l19.1,31.9L127.5,193.2       L127.5,193.2z"
                    />
                    <path
                      fill="#003049"
                      d="M492,193.2l19.5-31.9c0.7-1.2,4.5-7.6,5.7-10.1h0.2c-0.2,2.8-0.2,7.8-0.2,10.1v39.9h16v-75h-16.3       l-24.3,40.2l-24.3-40.2h-18.1v75h16v-39.9c0-2.3-0.1-7.2-0.2-10.1h0.2c1.2,2.4,5,8.9,5.7,10.1l19.5,31.9L492,193.2L492,193.2z"
                    />
                    <path
                      fill="#003049"
                      d="M77.2,179.2h-17v0.5c0,6.1-3.3,7.5-10.6,7.5H33.4c-12.3,0-14.2-1.5-14.2-15.8V155       c0-13.3,1.8-14.8,13.9-14.8H49c7.2,0,10.4,1.3,10.4,7h18.9c0-16.4-6.5-22-26.9-22H30.2c-19.4,0-27,7.3-27,26.2v23.9       c0,18.5,7.5,25.8,26.6,25.8h20.9c20.2,0,26.5-5.5,26.5-21.6V179.2z"
                    />
                    <path
                      fill="#003049"
                      d="M354.2,179.2h-17v0.5c0,6.1-3.3,7.5-10.6,7.5h-16.2c-12.3,0-14.2-1.5-14.2-15.8V155       c0-13.3,1.8-14.8,13.9-14.8H326c7.2,0,10.4,1.3,10.4,7h18.9c0-16.4-6.5-22-26.9-22h-21.2c-19.4,0-27,7.4-27,26.3v23.9       c0,18.5,7.5,25.7,26.6,25.7h20.9c20.2,0,26.5-5.5,26.5-21.5V179.2z"
                    />
                    <path
                      fill="#003049"
                      d="M423.2,172.2v7.9c0,5.8-3.2,7.1-10.5,7.1h-19.4c-12.2,0-14-1.4-14-15V155c0-13.3,1.8-14.8,13.9-14.8       h18.5c7.2,0,10.4,1.3,10.4,7h18.9c0-16.4-6.5-22-26.9-22h-23.7c-19.4,0-27,7.4-27,26.3V175c0,18.8,7.5,26.2,26.4,26.2h23.2       c20.1,0,26.3-5.6,26.3-21.9v-20.1h-38v13H423.2z"
                    />
                  </g>
                </g>
                <path
                  fill="#003049"
                  d="M235.5,290.2c-3.8,3-20.5,17.9-28.8,28.1c-0.6,0.8-0.2,1.9,0.7,2.2c43.7,12.7,176,0.3,238.8-94.8     c0.9-1.3,0.7-1.7-0.3-2.5c-21.9,35.5-71.6,63.4-131.7,69.2c-24.7,2.4-49.9,0.4-74.7-3.9C237.1,288.3,237.2,288.7,235.5,290.2z"
                />
              </g>
            </g>
          </g>
          <g id="ANL"></g>
          <g id="Calque_3"></g>
          <g id="Calque_4"></g>
          <g id="Calque_4_-_copie" display="none">
            <g display="inline">
              <g>
                <g>
                  <g>
                    <g>
                      <path
                        fill="#003049"
                        d="M-61.4,88.2c0,0,44-26.3,96.5-9.2c0,0-22.8,33.9-28.6,81.6c0,0-32.8-20.3-82-1L-61.4,88.2z"
                      />
                    </g>
                  </g>
                  <polygon
                    fill="#003049"
                    points="-14.1,102.6 8.5,100.9 -11.6,115.1     "
                  />
                  <polygon
                    fill="#003049"
                    points="-7.4,122 4,121.1 -4.4,115.3     "
                  />
                </g>
              </g>
              <g>
                <path
                  fill="#003049"
                  d="M-34.3,253.3h-16l27.8-67.7h20.6L26,253.3H9.6l-4.4-11.4h-35L-34.3,253.3z M-24.9,229H0.2l-12.6-32.7     L-24.9,229z"
                />
                <path
                  fill="#003049"
                  d="M83.4,253.3l-30.7-38.2c-1.6-2-5-6.3-6.5-9h-0.2c0.2,2.5,0.3,7,0.3,9v38.2H32.3v-67.7h14.4l30.7,38.2     c1.7,2,5,6.3,6.6,9h0.2c-0.3-2.5-0.4-7-0.4-9v-38.2h13.9v67.7H83.4z"
                />
                <path
                  fill="#003049"
                  d="M120,253.3h-16l27.8-67.7h20.6l27.8,67.7h-16.4l-4.4-11.4h-35L120,253.3z M129.4,229h25.1l-12.6-32.7     L129.4,229z"
                />
                <path
                  fill="#003049"
                  d="M246.7,185.6l-26.4,67.7h-20.6l-26.5-67.7h16.4l20.6,56.9l20.5-56.9H246.7z"
                />
              </g>
            </g>
          </g>
          <g id="Calque_6"></g>
        </svg>{" "}
      </div>
    </div>
  );
}
