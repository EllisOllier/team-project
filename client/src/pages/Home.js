// Import necessary files and libraries
import React from 'react'; // Import React library to create components
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import ApiAliveStatus from '../components/ApiAliveStatus'; // Import a component to check API status (though it's not used in this file)
import "../styles/main.css"; // Import the main CSS stylesheet for styling

// Define the Home component
const Home = () => {
  const navigate = useNavigate(); // Create a navigation function using the useNavigate hook
  
  // Function to navigate the user to the sign-up page when the button is clicked
  const NavigateToSignUp = () => {
    navigate("/sign-up"); // Navigate to the '/sign-up' route
  }

  return (
    // JSX structure of the Home component starts here
    <div>
      {/* Container for the main title and call-to-action button */}
      <div className="title-container">
        <h1>Finance Tracker for Students</h1> {/* Main title of the application */}
        <h2>Budgeting made easy</h2> {/* Subtitle or tagline */}
        {/* Button that triggers navigation to the sign-up page */}
        <button className='signup-button' onClick={NavigateToSignUp}>
          Create a new account
        </button>
      </div>

      {/* Section to showcase the app features */}
      <div className='feature-showcase'>
        <h2>Features</h2> {/* Section title */}

        {/* Container holding individual features */}
        <div className='feature-container'>

          {/* Feature 1: Track Expenses */}
          <div className='feature' onClick={() => navigate("/expense-tracker")}>
            <h3>Track Expenses</h3>
            <p>Keep track of your expenses and see where your money is going.</p>
          </div>

          {/* Feature 2: Convert Currencies */}
          <div className='feature' onClick={() => navigate("/currency-converter")}>
            <h3>Convert Currencies</h3>
            <p>Convert currencies on the fly to see how much you are spending.</p>
          </div>

          {/* Feature 3: Budget Forecasting */}
          <div className='feature' onClick={() => navigate("/expense-tracker")}>
            <h3>Budget Forecasting</h3>
            <p>See how much you are projected to spend and how much you have left.</p>
          </div>

          {/* Feature 4: Financial Goals */}
          <div className='feature' onClick={() => navigate("/expense-tracker")}>
            <h3>Financial Goals</h3>
            <p>Set financial goals and track your progress.</p>
          </div>
        </div>
      </div>
    </div>
    // JSX structure ends here
  );
};

export default Home; // Export the Home component so it can be used in other parts of the app