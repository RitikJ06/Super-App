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
  let randomArticle = Math.floor(Math.random() * 100);

  useEffect(() => {
    const url = "https://newsapi.org/v2/everything?apiKey=1257754e20cd47c3a8dd6a9990608cf0&language=en&q=travel";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        newsData = await response.json();
        setNewsTitle(newsData['articles'][randomArticle]['title']);
        let pubDate = new Date(newsData['articles'][randomArticle]['publishedAt']);
        setNewsDate(pubDate.toLocaleDateString().replaceAll('/','-'));
        setNewsTime(pubDate.toLocaleTimeString('en-US', { hour: '2-digit', minute:'2-digit', hour12: true }))
        setImgSrc(newsData['articles'][randomArticle]['urlToImage']);
        setNewsDesc(newsData['articles'][randomArticle]['description'])
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
