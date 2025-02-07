// Import neccessary files
import React from 'react';
import ApiAliveStatus from '../components/ApiAliveStatus';

const Home = () => {
  return (
    // Add html below
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
      <ApiAliveStatus />
    </div>
    // Add html above
  );
};

export default Home;