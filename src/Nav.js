// src/Nav.js
import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import "./Nav.css";
import logo from './assets/zynema_avatar.png';



function Nav() {
  const [show, handleShow] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUsername(currentUser.displayName || currentUser.email);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img src={logo} alt="Zynema Logo" className="nav_logo" />

      <div
        className="nav_avatar_container"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          alt="User Avatar"
          className="nav_avatar"
        />
        {dropdownOpen && (
          <div className="nav_dropdown">
            <b>
              <p style={{ color: "white", fontSize: "16px" }}>
                Hi😀 {username}!!!
              </p>
            </b>
            <br />
            <b>
              <p>Profile</p>
            </b>
            <b>
              <p onClick={handleLogout} className="logout_btn">
                Logout
              </p>
            </b>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
