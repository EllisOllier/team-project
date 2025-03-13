// Import necessary files
import React from 'react'; // Import React library
import "../styles/main.css"; // Import main stylesheet
import ApiAliveStatus from './ApiAliveStatus'; // Import the API status checker component
import '../components/ApiAliveStatus.css'; // Import CSS specifically for the ApiAliveStatus component

// Define the Footer component
const Footer = () => {
  return (
    // JSX for the footer section
    <footer className="footer">
      <ApiAliveStatus />
    </footer>
  );
};

export default Footer; // Export the Footer component