import React from 'react';
import styles from './Weather.module.css'
import lineImg from './images/Line.svg';
import berometerImg from './images/berometer.svg';
import windImg from './images/wind.svg';
import humidityImg from './images/humidity.svg';

import { useEffect, useState } from 'react';

export default function Weather() {
  let [currentWeather, setCurrentWeather] = useState('');
  let [currentWeatherImage, setCurrentWeatherImage] = useState('');
  let [temperature, setTemperature] = useState('');
  let [pressure, setPressure] = useState('');
  let [wind, setWind] = useState('');
  let [humidity, sethumidity] = useState('');

  let today = new Date();
  let weatherData;

  useEffect(() => {
    const url = "http://api.weatherapi.com/v1/current.json?key=8746d01e829c4cdd98c24105232004&q=Jaipur";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        weatherData = await response.json();
        setCurrentWeather(weatherData['current']['condition']['text']);
        setCurrentWeatherImage(weatherData['current']['condition']['icon']);
        setTemperature(weatherData['current']['temp_c']);
        setPressure(weatherData['current']['pressure_mb']);
        setWind(weatherData['current']['wind_kph']);
        sethumidity(weatherData['current']['humidity']);
      } catch (error) {
        console.log("error ", error);
      }
    };

    fetchData();
    }, []);

  return (
    <section className={styles.weatherCard}>
        <div className={styles.dateTimeSection}>
            <span>{today.toLocaleDateString().replaceAll('/','-')}</span>
            <span>{today.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit', hour12: true })}</span>
        </div>
        <div className={styles.weatherSection}>
            <div className={styles.weatherStatusWrapper}>
                <img src={currentWeatherImage} style={{width:"50%", margin:"0.2rem"}}/>
                <span>{currentWeather}</span>
            </div>
            <img src={lineImg}/>

            <div className={styles.weatherStatusWrapper}>
                <span className={styles.temperature}>{temperature + "°C"}</span>
                <div className={styles.iconValue}>
                    <img src={berometerImg} />
                    <p>{pressure + " mbar"}<br/>Pressure</p>
                </div>
            </div>
            <img src={lineImg}/>

            <div className={styles.weatherStatusWrapper}>
                <div className={styles.iconValue}>
                    <img src={windImg} />
                    <p>{wind + " Km/h"}<br/>Wind</p>
                </div>
                <div className={styles.iconValue}>
                    <img src={humidityImg} />
                    <p>{humidity + "%"}<br/>Humidity</p>
                </div>
            </div>
        </div>

    </section>
  )
}
