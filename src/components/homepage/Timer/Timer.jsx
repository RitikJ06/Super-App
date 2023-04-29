import React from 'react';
import styles from './timer.module.css';
import upArrowImg from './images/upArrow.svg';
import downArrowImg from './images/downArrow.svg';
import 'react-circular-progressbar/dist/styles.css';

import { useState, useRef } from "react";
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';

export default function () {

  let [hours, setHours] = useState(0);
  let [minutes, setminutes] = useState(0);
  let [secs, setSecs] = useState(0);

  let [totalCurrentSecs, setTotalCurrentSecs] = useState(0);

  let totalSecs = 0;
  let totalUpdatedCurrentSecs = 0;
  let [currentPercent, SetCurrentPercent] = useState(100);

  let [interval, setCurrentInterval] = useState(null);
  let [isPlaying, setIsPlaying] = useState(false);

  let timerBtnText = useRef("Start");
  const reduceHours = () => {
    hours > 0 ? setHours(hours-1) : setHours(hours);
  }
  const reduceMinutes = () => {
    minutes > 0 ? setminutes(minutes -1) : (hours > 0 ? setHours(hours-1) || setminutes(59) : setminutes(minutes)) 
  }

  const reduceSecs = () => {
    secs > 0 ? setSecs(secs -1) : (minutes > 0 ? setminutes(minutes-1) || setSecs(59) : (hours > 0 ? setHours(hours-1) || setminutes(59) || setSecs(59): setminutes(minutes)) ) 
  }

  const playTimer = () => {
        console.log(totalSecs, totalUpdatedCurrentSecs);
        if(totalUpdatedCurrentSecs == 0){
            clearInterval(interval);
            return;
        }
        setTotalCurrentSecs((totalUpdatedCurrentSecs) => totalUpdatedCurrentSecs-1);
        totalUpdatedCurrentSecs--;
        SetCurrentPercent((totalUpdatedCurrentSecs/totalSecs) * 100 );
    }

  const startTime = () => {
    if(isPlaying){
        clearInterval(interval);
        timerBtnText.current = "Start";
        return;
    }
    else{
        totalSecs = secs + minutes * 60 + hours * 3600;
        totalUpdatedCurrentSecs = totalSecs;
        setTotalCurrentSecs(totalSecs);
        // console.log(currentHours, currentMinutes, currentSecs);
        // interval = setInterval(playTimer, 1000);
        setCurrentInterval(setInterval(playTimer, 1000));
        timerBtnText.current = "Stop";
    }
  }
  
  return (
      <div className={styles.timerSection}>
        <div className={styles.timerWrapper}>
            <CircularProgressbar 
            className={styles.circularProgressBar} 
            strokeWidth	= "6"
            styles={
                buildStyles({
                    pathColor: "#FF6A6A",
                    textColor: 'white',
                    trailColor: '#1E2343'
                })
            }
            value={currentPercent} text={
                (Math.floor(totalCurrentSecs/3600)).toString().padStart(2, '0') + ":" + (Math.floor((totalCurrentSecs%3600)/60)).toString().padStart(2, '0') + ":" + (totalCurrentSecs%60).toString().padStart(2, '0') } />
        </div>

        <div className={styles.inputStartSection}>
            <div className={styles.timerInputWrapper}>
                <div className={styles.timerInput}>
                    <span className={styles.timerInputLabel}>Hours</span>
                    <img src={upArrowImg} className={styles.upArrow} onClick={() => { setHours(hours + 1)}}/>
                    <p className={styles.timerInputField}>{hours}</p>
                    <img src={downArrowImg} className={styles.downArrow} onClick={ reduceHours }/>
                </div>
                <div className={styles.timerInput}>
                    <span className={styles.timerInputLabel}>Minutes</span>
                    <img src={upArrowImg} className={styles.upArrow} onClick={() => { minutes == 59 ? setminutes(0) || setHours(hours + 1) : setminutes(minutes+1)}}/>
                    <p className={styles.timerInputField}>{minutes}</p>
                    <img src={downArrowImg} className={styles.downArrow} onClick={ reduceMinutes }/>
                </div>
                <div className={styles.timerInput}>
                    <span className={styles.timerInputLabel}>Seconds</span>
                    <img src={upArrowImg} className={styles.upArrow} onClick={() => {secs == 59 ? ( minutes == 59 ? setHours(hours+1) || setminutes(0) || setSecs(0) : setminutes(minutes+1) || setSecs(0) ) : setSecs(secs+1) }}/>
                    <p className={styles.timerInputField}>{secs}</p>
                    <img src={downArrowImg} className={styles.downArrow} onClick={ reduceSecs }/>
                </div>  
            </div>
                <button onClick={() =>{ setIsPlaying((isPlaying) => !isPlaying); startTime() }} className={styles.timerStartButton}>{timerBtnText.current}</button>
        </div>
    </div>
  )
}
