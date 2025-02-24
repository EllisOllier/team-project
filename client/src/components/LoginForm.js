// Import neccessary files
import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/main.css";


const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Create a navigation function

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
        // Store userID to local storage
        localStorage.setItem('userID', result.userID)
        //update login status 
        setIsLoggedIn(true);
        // Redirect or perform further actions here
        navigate("/Dashboard");
      } else {
        // Login failed
        setErrorMessage(result.error || 'Invalid username or password');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred');
      console.error('Unexpected error:', err);
    }
  };

  if (isLoggedIn) {
    return null;
  }

  return (
    <form className="login-form" onSubmit={checkLogin}>
      <h2 id="login-title">Login</h2>
      <label htmlFor="username"></label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <label htmlFor="password"></label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button id="login-button" type="submit">Login</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Link to="/sign-up">Don't have an account? Sign up here</Link>
    </form>
  );
};

export default LoginForm;