// src/AuthPage.js
import React, { useState } from "react";
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

      window.location.reload(); // Refresh after login/signup
    } catch (err) {
      setError(err.message);
      console.error("Auth error", err);
    }
  };

  return (
    <div className="auth">
      <div className="auth__container">
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
