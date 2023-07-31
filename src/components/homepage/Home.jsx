import React from "react";
import Profile from "./profile/Profile";
import styles from "./home.module.css";
import Weather from "./weather/Weather";
import News from "./news/News";
import Notes from "./notes/Notes";
import Timer from "./Timer/Timer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <section className={styles.homeSection}>
      <div className={styles.topSection}>
        <div className={styles.leftSection}>
          <div className={styles.upperSection}>
            <div className={styles.upperLeft}>
              <div className={styles.profileWrapper}>
                <Profile />
              </div>
              <div className={styles.weatherWrapper}>
                <Weather />
              </div>
            </div>

            <div className={styles.upperRight}>
              <Notes />
            </div>
          </div>

          <div className={styles.lowerSection}>
            <Timer />
          </div>
        </div>

        <div className={styles.rightSection}>
          <News />
        </div>
      </div>
      <div className={styles.bottomSection}>
        <button
          className={styles.browseButton}
          onClick={() => navigate("/entertainment")}
        >
          Browse
        </button>
      </div>
    </section>
  );
}
