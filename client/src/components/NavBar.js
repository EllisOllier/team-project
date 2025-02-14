// Import necessary files
import React, { useState } from 'react';
import LoginForm from "./LoginForm"; // Ensure the correct path
import { Link } from 'react-router-dom';
import "../styles/main.css";
import DarkModeToggle from './DarkModeToggle'; // Import Dark Mode Toggle

const NavBar = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);

  const toggleLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  return (
<nav className="navbar">
  <ul className="navbar-list">
    <li className="navbar-item"><Link to="/">Home</Link></li>
    <li className="navbar-item"><Link to="/dashboard">Dashboard</Link></li>
    <li className="navbar-item"><Link to="/currency-converter">Currency Converter</Link></li>
    <li className="navbar-item"><Link to="/expense-tracker">Expense Tracker</Link></li>
    <li className="navbar-item"><Link to="/budget-forecasting">Budget Forecasting</Link></li>
    <li className="navbar-item"><DarkModeToggle /></li>
    <li className="navbar-item"><button onClick={toggleLoginForm} id='login-button'>Login</button></li>
  </ul>
  {isLoginFormVisible && (<LoginForm />)}
</nav>
  );
};

export default NavBar;