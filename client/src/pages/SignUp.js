import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "../styles/main.css";

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const CheckSignUp = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/user/signup/create-account/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (response.ok) {
        setErrorMessage('');
        localStorage.setItem('userID', result.userID);
        setIsLoggedIn(true);
        navigate("/dashboard");
      } else {
        setErrorMessage(result.error || 'Username already exists');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred');
      console.error('Unexpected error:', err);
    }
  };

  return (
    <div>
      <div className='title-container'>
        <h1>Sign Up</h1>
        <h2>Don't have an account? Make one now.</h2>
      </div>
      <div className='signup-container'>
        <form className='signup-form' onSubmit={CheckSignUp}>
          <label htmlFor="username"></label>
          <input
            className="signup-item"
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
            className="signup-item"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button className="signup-item" type="submit">Sign Up</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;