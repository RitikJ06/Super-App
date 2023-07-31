import React from "react";
import styles from "./news.module.css";
import newsImgPlaceholder from "./newsBg.png";

import { useEffect, useState } from "react";

export default function News() {
  let [imgSrc, setImgSrc] = useState(newsImgPlaceholder);
  let [newsTitle, setNewsTitle] = useState("");
  let [newsDate, setNewsDate] = useState("");
  let [newsTime, setNewsTime] = useState("");
  let [newsDesc, setNewsDesc] = useState("");

  let newsData;

  useEffect(() => {
    const url = process.env.REACT_APP_NEWS_API;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        newsData = await response.json();
        const random = Math.floor(Math.random() * newsData["results"].length);

        newsData = newsData["results"][random];
        setNewsTitle(newsData["title"]);
        let pubDate = new Date(newsData["pubDate"]);
        setNewsDate(pubDate.toLocaleDateString().replaceAll("/", "-"));
        setNewsTime(
          pubDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        );
        setImgSrc(newsData["image_url"]);
        setNewsDesc(newsData["description"].slice(0, 300));
      } catch (error) {
        console.log("error ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
        className={styles.newsImgWrapper}
        style={
          imgSrc
            ? { background: "url(" + imgSrc + ")" }
            : { background: "url(" + newsImgPlaceholder + ")" }
        }
      >
        <div className={styles.newsHeadingWrapper}>
          <h2 style={{ margin: "1rem 0rem" }}>{newsTitle}</h2>
          <span>
            {newsDate} | {newsTime}
          </span>
        </div>
      </div>

      <div className={styles.newsDesc}>{newsDesc + "..."}</div>
    </>
  );
}
