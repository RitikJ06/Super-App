import React from "react";
import styles from "./entertainment.module.css";
import HeadingImg from "../images/Super_App_Heading.svg";
import profileImg from "./profile.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Entertainment() {
  const [moviesImage, setMoviesImage] = useState([]);

  let genres = JSON.parse(localStorage.getItem("categoriesList")).slice(0, 3);
  useEffect(() => {
    try {
      const fetchMoviesData = async () => {
        let imagesData = [];
        if (genres) {
          for (const genre of genres) {
            let bgURLsList = [],
              counter = 0;
            const url = process.env.REACT_APP_MOVIE_API + genre;
            const response = await fetch(url);
            const data = await response.json();
            while (bgURLsList.length < 4 && counter != data["results"].length) {
              let image = data["results"][counter]["backdrop_path"];
              if (image) {
                bgURLsList.push("https://image.tmdb.org/t/p/original/" + image);
              }
              counter++;
            }
            imagesData.push(bgURLsList);
          }
        }
        setMoviesImage(imagesData);
      };
      fetchMoviesData();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className={styles.entertainmentSection}>
      <div className={styles.navabar}>
        <img className={styles.superAppLogo} src={HeadingImg} />
        <Link to="/home">
          <img className={styles.profileIcon} src={profileImg} />
        </Link>
      </div>

      <div className={styles.moveisSection}>
        <span className={styles.choiceHeading}>
          Entertainment according to your choice
        </span>
        <div className={styles.moviesCategoryList}>
          <div className={styles.moviesListWrapper}>
            {genres.map((genre, index) => (
              <>
                <div className={styles.categoryHeading}>{genre}</div>
                <div className={styles.moviesList}>
                  {moviesImage[index] && moviesImage[index].map((imgURL) => (
                      <div
                        key={imgURL}
                        className={styles.movie}
                        style={{ background: "url(" + imgURL + ")" }}
                      ></div>
                    ))}
                </div>
              </>
            ))}

            {/* {genres[0] && (
              <>
                <div className={styles.categoryHeading}>{genres[0]}</div>
                <div className={styles.moviesList}>
                  {genre1 &&
                    genre1.map((imgURL) => (
                      <div
                        key={imgURL}
                        className={styles.movie}
                        style={{ background: "url(" + imgURL + ")" }}
                      ></div>
                    ))}
                </div>
              </>
            )}
            {genres[1] && (
              <>
                <div className={styles.categoryHeading}>{genres[1]}</div>
                <div className={styles.moviesList}>
                  {genre2 &&
                    genre2.map((imgURL) => (
                      <div
                        key={imgURL}
                        className={styles.movie}
                        style={{ background: "url(" + imgURL + ")" }}
                      ></div>
                    ))}
                </div>
              </>
            )}
            {genres[2] && (
              <>
                <div className={styles.categoryHeading}>{genres[2]}</div>
                <div className={styles.moviesList}>
                  {genre3 &&
                    genre3.map((imgURL) => (
                      <div
                        key={imgURL}
                        className={styles.movie}
                        style={{ background: "url(" + imgURL + ")" }}
                      ></div>
                    ))}
                </div>
              </>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
