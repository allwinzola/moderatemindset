import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MenNavBar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="navbar-logo-link">Moderate Mindset</Link>
        </div>

        <div className="hamburger-menu" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li className="navbar-item">
            <Link to="/dashboard" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
          </li>
          <li className="navbar-item">
            <Link to="/checkin" className="navbar-link" onClick={() => setIsMenuOpen(false)}>Check-in</Link>
          </li>
          <li className="navbar-item">
            <button onClick={handleLogout} className="navbar-logout-btn">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
