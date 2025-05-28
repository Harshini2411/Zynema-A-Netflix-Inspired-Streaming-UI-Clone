import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import AuthPage from "./AuthPage";
import Nav from "./Nav";
import Banner from "./Banner";
import Row from "./Row";
import requests from "./request";
import "./App.css";

// Protected Route Wrapper
function ProtectedRoute({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <AuthPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute user={user}>
              <MainPage user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

// Extract main app layout to a separate component
function MainPage({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
       window.location.href='/login';
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      <Nav user={user} onLogout={handleLogout} />
      <Banner />
      <Row title="Netflix Originals" fetchURL={requests.fetchNetflixOriginals} isLargeRow />
      <Row title="Trending Now" fetchURL={requests.fetchTrending} />
      <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
      <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
    </>
  );
}

export default App;
