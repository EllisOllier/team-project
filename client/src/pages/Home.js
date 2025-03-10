// Import neccessary files
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/main.css";

const Home = () => {
  const navigate = useNavigate(); // Create a navigation function
  const NavigateToSignUp = () => {
    navigate("/sign-up");
  }

  return (
    // Add html below
    <div>
      <div className="title-container">
        <h1>Finance Tracker for Students</h1>
        <h2>Budgeting made easy</h2>
        <button className='signup-button' onClick={NavigateToSignUp} >Create a new account</button>
      </div>
      <div className='feature-showcase'>
        <h2>Features</h2>

        <div className='feature-container'>
          <div className='feature'>
            <h3>Track Expenses</h3>
            <p>Keep track of your expenses and see where your money is going.</p>
          </div>
          <div className='feature'>
            <h3>Convert Currencies</h3>
            <p>Convert currencies on the fly to see how much you are spending.</p>
          </div>
          <div className='feature'>
            <h3>Budget Forecasting</h3>
            <p>See how much you are projected to spend and how much you have left.</p>
          </div>
          <div className='feature'>
            <h3>Financial Goals</h3>
            <p>Set financial goals and track your progress.</p>
          </div>
        </div>
      </div>
    </div>
    // Add html above
  );
};

export default Home;