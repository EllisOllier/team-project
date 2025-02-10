// Import neccessary files
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/main.css";

const NavBar = () => {
  return (
    // Add html below
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/about">About</Link></li>
        <li className="navbar-item"><Link to="/services">Services</Link></li>
        <li className="navbar-item"><Link to="/contact">Contact</Link></li>
        <li className="navbar-item"><button className='login-button'>Login</button></li>
      </ul>
    </nav>
    // Add html above
  );
};

export default NavBar;