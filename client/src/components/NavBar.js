// Import necessary files
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/main.css";
import DarkModeToggle from './DarkModeToggle'; // Import Dark Mode Toggle

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const checkLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/user/validate-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Login successful
        setErrorMessage('');
        console.log('Login successful', result);
        // Redirect or perform further actions here
      } else {
        // Login failed
        setErrorMessage(result.error || 'Invalid username or password');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred');
      console.error('Unexpected error:', err);
    }
  };

  return (
    <form className="login-form" onSubmit={checkLogin}>
      <h2>Login</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button id="login-button" type="submit">Login</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Link to="/signup">Don't have an account? Sign up here</Link>
    </form>
  );
};

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