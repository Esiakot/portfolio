import styles from "./page.module.css";
import Stats from "@/components/Olympique/Stats";
import MainElement from "@/components/Olympique/MainElement";

export default function Home() {
  return (
    <div className={styles.page}>
      <MainElement />
      <Stats />
    </div>
  );
}
