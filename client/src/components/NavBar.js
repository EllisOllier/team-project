import React, { useState, useEffect } from 'react';
import LoginForm from "./LoginForm"; // Ensure the correct path
import { Link } from 'react-router-dom';
import "../styles/main.css";
import DarkModeToggle from './DarkModeToggle'; // Import Dark Mode Toggle

const NavBar = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const userID = localStorage.getItem("userID");
    setIsLoggedIn(!!userID); // Convert to boolean (true if userID exists)
  }, []);

  const toggleLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('userID');
    setIsLoggedIn(false);
  }

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/currency-converter">Currency Converter</Link></li>

        {/* Show these only if user is logged in */}
        {isLoggedIn && (
          <>
            <li className="navbar-item"><Link to="/dashboard">Dashboard</Link></li>
            <li className="navbar-item"><Link to="/expense-tracker">Expense Tracker</Link></li>
            <li className="navbar-item"><Link to="/budget-forecasting">Budget Forecasting</Link></li>
          </>
        )}

        <li className="navbar-item"><DarkModeToggle /></li>

        {isLoggedIn && (
          <li className="navbar-item">
            <button onClick={handleLogout} style= {{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <i className="fas fa-sign-out-alt logout-icon"></i>
            </button>
          </li>
        )}

        {/* Show Login button if not logged in */}
        {!isLoggedIn && (
          <li className="navbar-item">
            <button onClick={toggleLoginForm} id='login-button'>Login</button>
          </li>
        )}
      </ul>

      {/* Show login form when button is clicked */}
      {isLoginFormVisible && <LoginForm />}
    </nav>
  );
};

export default NavBar;