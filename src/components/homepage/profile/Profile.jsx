import React from 'react';
import styles from './profile.module.css';
import profileImg from './profile.svg'

export default function Profile() {
  // read user data
  let dataString = localStorage.getItem("userData");
  let userData = JSON.parse(dataString);

  // get selected categories
  let categoriesList = JSON.parse(localStorage.getItem("categoriesList"));

  return (
    <section className={styles.profileSection}>
      <div className={styles.profileImg}>
        <img src={profileImg} style={{height: "100%"}}/>
      </div>
      <div className={styles.profileDetails}>
        <div className={styles.userData}>
            <span className={styles.NameEmail}>{userData.name}</span>
            <span className={styles.NameEmail}>{userData.email}</span>
            <h1 className={styles.userName}>{userData.username}</h1>
        </div>  
        <div className={styles.selectedCategories}>
          {categoriesList.map((category) => 
              (<div key={category} className={styles.categoryItem}>{category}</div>)
          )}
        </div>
      </div>
    </section>
  ) 
}
