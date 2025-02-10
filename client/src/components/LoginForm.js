// Import neccessary files
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/login-form.css";

const LoginForm = () => {
  return (
    // Add html below
    <form className="login-form">
      <h2>Login</h2>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" name="password" required />
      <button id='login-button'>Login</button>
      <Link to="/signup">Don't have an account? Sign up here</Link>
    </form>
    // Add html above
  );
};

export default LoginForm;