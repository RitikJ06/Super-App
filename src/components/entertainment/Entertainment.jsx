import React from 'react';
import styles from './entertainment.module.css';
import HeadingImg from '../images/Super_App_Heading.svg';
import profileImg from './profile.svg';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

export default function Entertainment() {
  let [genre1, setGenre1] = useState([]);
  let [genre2, setGenre2] = useState([]);
  let [genre3, setGenre3] = useState([]);
//   let [imgURLs, setImgURLs] = useState([]);

  
  let genres = JSON.parse(localStorage.getItem("categoriesList")).slice(0, 3);
  useEffect( () => {
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/octet-stream',
                'X-RapidAPI-Key': 'd50e1f51famsh2fe2db3a688c33cp187c89jsnff71bd7de425',
                'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
            }
        };
        const fetchMoviesData = async (genre, setter) => {
            const url = 'https://api.themoviedb.org/3/discover/movie?api_key=294c0d94fd6a0914ca06dd639c14c4fd&language=en-US&sort_by=popularity.desc&include_video=false&page=1&with_genres=' + genre;
            try {
                const response = await fetch(url);
                const data = await response.json();
                let bglist = []
                for(let i=0; i<4; i++){
                    bglist.push('https://image.tmdb.org/t/p/original/' + data['results'][i]['backdrop_path'])
                }
                setter(bglist);
            } catch (error) {
                console.error(error);
            }
        }
        // genres.map((item) => fetchMoviesData(item));
        genres[0] && fetchMoviesData(genres[0], setGenre1);
        genres[1] && fetchMoviesData(genres[1], setGenre2);
        genres[2] && fetchMoviesData(genres[2], setGenre3);
    }, []);

  return (
    <div className={styles.entertainmentSection}>
        <div className={styles.navabar}>
            <img className={styles.superAppLogo} src={HeadingImg}/>
            <Link to="/home">
            <img className={styles.profileIcon} src={profileImg}/>
            </Link>

        </div>

        <div className={styles.moveisSection}>
            <span className={styles.choiceHeading}>Entertainment according to your choice</span>
            <div className={styles.moviesCategoryList}>
                <div className={styles.moviesListWrapper}>
                    {genres[0] && 
                        <>
                        <div className={styles.categoryHeading}>{genres[0]}</div>
                        <div className={styles.moviesList}>
                            {genre1 && genre1.map((imgURL) => 
                                <div key={imgURL} className={styles.movie} style={{ background: "url(" + imgURL + ")" }}></div> 
                                )
                            }
                        </div>
                        </>
                    }
                    {genres[1] &&
                        <>
                        <div className={styles.categoryHeading}>{genres[1]}</div>
                        <div className={styles.moviesList}>
                            {genre2 && genre2.map((imgURL) => 
                                <div key={imgURL} className={styles.movie} style={{ background: "url(" + imgURL + ")" }}></div> 
                                )
                            }
                        </div>
                        </>
                    }
                    {genres[2] && 
                        <>
                        <div className={styles.categoryHeading}>{genres[2]}</div>
                        <div className={styles.moviesList}>
                            {genre3 && genre3.map((imgURL) => 
                                <div key={imgURL} className={styles.movie} style={{ background: "url(" + imgURL + ")" }}></div> 
                                )
                            }
                        </div>
                        </>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}
