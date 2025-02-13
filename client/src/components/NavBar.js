// Import neccessary files
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/main.css";
import LoginForm from './LoginForm';

const NavBar = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = React.useState(false);
  const toggleLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  return (
    // Add html below
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/">Home</Link></li>
        <li className="navbar-item"><Link to="/dashboard">Dashboard</Link></li>
        <li className="navbar-item"><Link to="/currency-converter">Currency Converter</Link></li>
        <li className="navbar-item"><Link to="/expense-tracker">Expense Tracker</Link></li>
        <li className="navbar-item"><Link to="/budget-forecasting">Budget Forecasting</Link></li>
        <li className="navbar-item"><button onClick={toggleLoginForm} id='login-button'>Login</button></li>
      </ul>
      {isLoginFormVisible && (<LoginForm />)}
    </nav>
    // Add html above
  );
};

export default NavBar;