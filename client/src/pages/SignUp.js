import {React, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/main.css";

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Create a navigation function

    const CheckSignUp = async (event) => {
        event.preventDefault();
        // Add api call
        console.log(username + password);
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