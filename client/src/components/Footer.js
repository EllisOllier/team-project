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
        <li className="footer-item"><Link to="/dashboard">Dashboard</Link></li>
        <li className="footer-item"><Link to="/currency-converter">Currency Converter</Link></li>
        <li className="footer-item"><Link to="/expense-tracker">Expense Tracker</Link></li>
        <li className="footer-item"><Link to="/budget-forecasting">Budget Forecasting</Link></li>
      </ul>
      <ApiAliveStatus />
    </footer>
    // Add html above
  );
};

export default Footer;