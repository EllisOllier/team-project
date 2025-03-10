import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/main.css";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate(); // Create a navigation function

    const CheckSignUp = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/check/create-account/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
              });

              const result = await response.json();
              if (response.ok) {
                // Account creation successful
                setErrorMessage('');
                console.log('Account created successfully!', result);
                // Store userID to local storage
                localStorage.setItem('userID', result.userID);
                // Update login status
                setIsLoggedIn(true);
                // Redirect to the dashboard or perform further actions here
                navigate("/Dashboard");
              } else {
                // Account creation failed
                setErrorMessage(result.error || 'Username already exists');
              }
        }
        catch (err) {
            setErrorMessage('An unexpected error occurred');
            console.error('Unexpected error:', err);
        }
    };

    if (isLoggedIn) {
        return null;
    }

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
}

export default SignUp;