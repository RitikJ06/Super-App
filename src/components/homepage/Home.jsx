import React from 'react'
import Profile from './profile/Profile';
import styles from './home.module.css'
import Weather from './weather/Weather';
import News from './news/News';

export default function Home() {
  return (
    <section className={styles.homeSection}>
      <div className={styles.leftSection}>
        <div className={styles.profileWrapper}>
          <Profile/>
        </div>
        <div className={styles.weatherWrapper}>
          <Weather/>
        </div>
      </div>

      <div className={styles.rightSection}>
        <News/>
      </div>


    </section>

  )
}
