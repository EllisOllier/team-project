// Import neccessary files
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    // Add html below
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/dashboard">Dashboard</Link></li>
        <li className="navbar-item"><Link to="/currency-converter">Currency Converter</Link></li>
        <li className="navbar-item"><Link to="/expense-tracker">Expense Tracker</Link></li>
        <li className="navbar-item"><Link to="/budget-forecasting">Budget forecasting</Link></li>
      </ul>
    </nav>
    // Add html above
  );
};

export default NavBar;