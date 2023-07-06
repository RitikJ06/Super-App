import React from 'react';
import styles from './news.module.css';
import newsImg from './newsBg.png';

import { useEffect, useState } from 'react';

export default function News() {
  let [imgSrc, setImgSrc] = useState(newsImg);
  let [newsTitle, setNewsTitle] = useState('');
  let [newsDate, setNewsDate] = useState('');
  let [newsTime, setNewsTime] = useState('');
  let [newsDesc, setNewsDesc] = useState('');

  let newsData;

  useEffect(() => {

    const url = "https://newsdata.io/api/1/news?apikey=pub_258071481b256e5463801d15ede042987e186&q=pegasus&language=en"
    
    const fetchData = async () => {
      try {
        const random = Math.floor(Math.random() * 5) + 1
        const response = await fetch(url);
        newsData = await response.json();
        newsData = newsData['results'][random]

        setNewsTitle(newsData['title']);
        let pubDate = new Date(newsData['pubDate']);
        setNewsDate(pubDate.toLocaleDateString().replaceAll('/','-'));
        setNewsTime(pubDate.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit', hour12: true }))
        setImgSrc(newsData['image_url']);
        setNewsDesc(newsData['description'])
      } catch (error) {
        console.log("error ", error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
        <div className={styles.newsImgWrapper} style={{background: "url("+imgSrc+")"}}>
            <div className={styles.newsHeadingWrapper}>
                <h2 style={{margin:"1rem 0rem"}}>{newsTitle}</h2>
                <span>{newsDate} | {newsTime}</span>
            </div>
        </div>
        
        <div className={styles.newsDesc}>
          {newsDesc}
        </div>
    </>
  )
}
