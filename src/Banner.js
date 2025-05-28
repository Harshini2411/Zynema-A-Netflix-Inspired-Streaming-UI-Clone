import React, { useEffect, useState, useRef } from "react";
import axios from "./axios";
import requests from "./request";
import movieTrailer from "movie-trailer";
import Youtube from "react-youtube";
import "./banner.css";

function Banner() {
  const [movie, setMovie] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const trailerRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (trailerRef.current && !trailerRef.current.contains(event.target)) {
        setTrailerUrl("");
      }
    }

    if (trailerUrl) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [trailerUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handlePlay = () => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const movieName = movie?.title || movie?.name || movie?.original_name || "";
      movieTrailer(movieName)
        .then((url) => {
          if (!url) {
            alert("Trailer not found");
            return;
          }
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch(() => alert("Trailer not found"));
    }
  };

  if (!movie) return null;

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button" onClick={handlePlay}>
            Play
          </button>
          <button
            className="banner__button"
            onClick={() =>
              alert(`Added ${movie.title || movie.name || movie.original_name} to My List`)
            }
          >
            My List
          </button>
        </div>
        <h1
          className="banner__description"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          title={movie.overview}
        >
          {isHovered ? movie.overview : truncate(movie.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />

      {trailerUrl && (
        <div ref={trailerRef}>
          <Youtube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </header>
  );
}

export default Banner;
