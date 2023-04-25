import React from 'react';
import styles from './timer.module.css';

export default function 
() {
  return (
    <div className={styles.timerSection}>
        <div className={styles.inputStartSection}>
            <div className={styles.timerInputWrapper}>
                <div className={styles.timerInput}>
                    <span className={styles.timerInputLabel}>Hours</span>
                    <input value={"00"} className={styles.timerInputField} type='number'/>
                </div>
                <div className={styles.timerInput}>
                    <span className={styles.timerInputLabel}>Minutes</span>
                    <input value={"00"} className={styles.timerInputField} type='number'/>
                </div>
                <div className={styles.timerInput}>
                    <span className={styles.timerInputLabel}>Seconds</span>
                    <input value={"00"} className={styles.timerInputField} type='number'/>
                </div>
            
            </div>
            <div className={styles.timerStartButton}>

            </div>
        </div>
    </div>
  )
}
