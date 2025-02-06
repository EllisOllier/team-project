import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/about">About</Link></li>
        <li className="navbar-item"><Link to="/services">Services</Link></li>
        <li className="navbar-item"><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;