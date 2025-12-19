"use client";

import Link from "next/link";
import styles from "@/styles/MainPage/Header.module.css";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerTop}></div>
      <div className={styles.header}></div>
    </div>
  );
}
