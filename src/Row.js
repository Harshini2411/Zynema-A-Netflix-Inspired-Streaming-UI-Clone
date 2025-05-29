///// 3. Row.js - Reusable Component //////

//✅ Accepts title and fetchUrl as props from App.js.

// ⚡ When the component loads, it uses useEffect() to:

// Call axios.get(fetchUrl) (like /trending/all/week?...)

// Get the movie list and set it in state.

// 🎞️ Then, displays movie posters using the data.

import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_URL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
  // //state: State is a data storage inside a component.
  // It lets the component remember things and re-render when the data changes.

  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //useEffect() callback->here it loads the entire row once and done it feeds the info it needs,since this is empty->[],,but whenever it has filling like [movies] the entire row like trendingnow or toprated loads whenever movie updated
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || movie?.original_name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2 className="row_display">{title}</h2>
      <div className="row_posters">
        {/* several row_posters */}
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_URL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
