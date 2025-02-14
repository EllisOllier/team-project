// Import neccessary files
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/main.css";
import ApiAliveStatus from './ApiAliveStatus';
import '../components/ApiAliveStatus.css';

const Footer = () => {
  return (
    // Add html below
    <footer className="footer">
      <ul className="footer-list">
        <li className="footer-item"><Link to="/">Home</Link></li>
        <li className="footer-item"><Link to="/about">About</Link></li>
        <li className="footer-item"><Link to="/services">Services</Link></li>
        <li className="footer-item"><Link to="/contact">Contact</Link></li>
      </ul>
      <ApiAliveStatus />
    </footer>
    // Add html above
  );
};

export default Footer;