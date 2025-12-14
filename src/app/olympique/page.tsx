import styles from "./page.module.css";
import Stats from "@/components/Olympique/Stats";
import MainElement from "@/components/Olympique/MainElement";
import Header from "@/components/Olympique/Common/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <MainElement />
      <Stats />
    </div>
  );
}
