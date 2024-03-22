import React, { useState } from 'react';
import '../../styles/styles.css';
import { Link } from "react-router-dom";

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Clear all sessions
    localStorage.clear();
    // Redirect to the login page
    window.location.href = "/";
  };

  return (
    <div className="menuContainer">
      <button className={`openButton ${menuOpen ? 'hide' : ''}`} onClick={toggleMenu}>
        ☰
      </button>
      <div className={`menuBox ${menuOpen ? 'open' : ''}`}>
        <button className="closeButton" onClick={toggleMenu}>
          ✕
        </button>
        <Link to="/LevelSelect" className="menuItem">LEVELS</Link>
        <Link to="/Profile" className="menuItem">PROFILE</Link>
        <Link to="/Leaderboards" className="menuItem">LEADERBOARD</Link>
        <Link to="/History" className="menuItem">HISTORY</Link>
        <button className="menuItem" onClick={handleLogout}>LOG OUT</button>
      </div>
    </div>
  );
}

export default Menu;
