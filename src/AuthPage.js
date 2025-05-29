// src/AuthPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import zynemalogo from "./assets/zynema_avatar.png";
import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "./AuthPage.css";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [bgMovie, setBgMovie] = useState(null);

  useEffect(() => {
    const fetchBackgroundMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=7a665e8674360f4cb57f5f2790ad3f68&sort_by=popularity.desc`
        );
        const movies = res.data.results;
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setBgMovie(
          `https://image.tmdb.org/t/p/original${randomMovie.backdrop_path}`
        );
      } catch (err) {
        console.error("Failed to load background movie", err);
      }
    };

    fetchBackgroundMovie();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, {
          displayName: username,
        });
        console.log("Profile updated");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      window.location.reload();
    } catch (err) {
      setError(err.message);
      console.error("Auth error", err);
    }
  };

  return (
    <div
      className="auth"
      style={{
        backgroundImage: bgMovie ? `url(${bgMovie})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <div className="auth__overlay"></div>
      <div className="auth__container">
        <img src={zynemalogo} alt="Zynema Logo" className="auth_logo" />
        <h1>{isRegister ? "Sign Up" : "Sign In"}</h1>
        {error && <p className="auth__error">{error}</p>}
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isRegister ? "Sign Up" : "Sign In"}</button>
          <h4>
            {isRegister ? "Already have an account?" : "New to Netflix?"}{" "}
            <span onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Sign In" : "Sign Up now."}
            </span>
          </h4>
        </form>
      </div>
    </div>
  );
}

export default AuthPage;
