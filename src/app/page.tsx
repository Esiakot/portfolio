import styles from "./page.module.css";
import MainPage from "@/components/MainPage/MainPage";
import Header from "@/components/MainPage/Header";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <MainPage />
    </div>
  );
}
