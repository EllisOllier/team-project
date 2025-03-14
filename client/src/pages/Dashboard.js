// Import necessary files
import React, { useState, useEffect } from "react"; // React core and hooks
import { Link } from "react-router-dom"; // For navigation links within the app

// Define the Dashboard component
const Dashboard = () => {
  // State variables to store user-related data
  const [userBudget, setUserBudget] = useState(0); // The user's total budget
  const [totalSpent, setTotalSpent] = useState(0); // The total amount the user has spent
  const [remainingBudget, setRemainingBudget] = useState(0); // The remaining budget after expenses
  const [expenses, setExpenses] = useState([]); // List of expenses fetched from the API
  const [username, setUsername] = useState(""); // The username for display
  const [userID, setUserID] = useState(localStorage.getItem("userID")); // Retrieve userID from local storage
  const [errorMessage, setErrorMessage] = useState(""); // Error messages for displaying issues

  // useEffect to fetch expenses and budget when the component mounts
  useEffect(() => {
    getExpenses(); // Fetch user's expenses
    getBudget(); // Fetch user's budget
  }, []);

  // useEffect to calculate the total spent whenever expenses are updated
  useEffect(() => {
    calculateTotalSpent(); // Calculate the total amount spent from expenses
  }, [expenses]);

  // useEffect to calculate the remaining budget whenever totalSpent or userBudget changes
  useEffect(() => {
    calculateRemainingBudget(); // Remaining budget = user budget - total spent
  }, [totalSpent, userBudget]);

  // useEffect to set the username when the component mounts
  useEffect(() => {
    setUsername(`, ${localStorage.getItem('username')}`); // Add comma and space for formatting
  }, []);

  // Function to fetch expenses from the backend API
  const getExpenses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses/get/get-expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID }), // Send userID in the request body
      });

      const result = await response.json(); // Parse the JSON response

      if (response.ok) {
        setExpenses(result.expenses); // Update expenses state with fetched data
        setErrorMessage(""); // Clear any previous error messages
        localStorage.setItem('expenses', JSON.stringify(result.expenses)); // Cache expenses in local storage
      } else {
        setErrorMessage(result.error || "Failed to get expenses"); // Set error message on failure
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred"); // Handle unexpected errors
      console.error("Unexpected error:", err); // Log the error to the console
    }
  };

  // Function to fetch the user's budget from the backend API
  const getBudget = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses/budget/get/get-budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID }), // Send userID in the request body
      });

      const result = await response.json(); // Parse the JSON response

      if (response.ok) {
        setUserBudget(result.userBudget); // Update userBudget state with fetched data
        localStorage.setItem('userBudget', result.userBudget); // Cache user budget in local storage
      } else {
        setErrorMessage(result.error || "Failed to fetch budget"); // Set error message on failure
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred"); // Handle unexpected errors
      console.error("Unexpected error:", err); // Log the error to the console
    }
  };

  // Function to calculate the total amount spent based on the expenses array
  const calculateTotalSpent = () => {
    const total = expenses.reduce((sum, expense) => sum + Number(expense.spendAmount), 0); // Sum all expense amounts
    setTotalSpent(total); // Update totalSpent state
  };

  // Function to calculate the remaining budget
  const calculateRemainingBudget = () => {
    const result = userBudget - totalSpent; // Subtract total spent from user's budget
    setRemainingBudget(result); // Update remaining budget state
  };

  // JSX returned by the Dashboard component
  return (
    <div>
      {/* Title Container */}
      <div className="title-container">
        <h1>Personal Dashboard</h1>
        {/* Display a personalized welcome message including the username */}
        <h3>Welcome back{username}! Keep your finances on track. 🚀</h3>
      </div>

      {/* HI */}

      <div className="dashboard-container">
  {/* Left Section: Budget Summary & Quick Actions */}
  <div className="left-section">
    <div className="card">
      <h2>Budget Summary</h2>
      <p><strong>Remaining Budget:</strong> £{remainingBudget}</p>
      <p><strong>Total Spent:</strong> £{totalSpent}</p>
    </div>

    <div className="card">
      <h2>Quick Actions</h2>
      <div className="button-container">
        <Link to="/expense-tracker">
          <button className="dashboard-button">💰 Go to Expense Tracker</button>
        </Link>
        <Link to="/currency-converter">
          <button className="dashboard-button">🔄 Open Currency Converter</button>
        </Link>
        {/* Show "View All Transactions" button if there are more than 5 expenses */}
        {expenses.length > 5 && (
          <Link to="/expense-tracker">
            <button className="dashboard-button">📜 View All Transactions</button>
          </Link>
        )}
      </div>
    </div>
  </div>

  {/* Right Section: Recent Transactions */}
  <div className="right-section">
    <div className="card">
      <h2>Recent Transactions</h2>
      <ul>
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <li key={index}>
              {expense?.spendDate} - {expense?.spendCategory}: £{expense?.spendAmount}
            </li>
          ))
        ) : (
          <p>No expenses found</p>
        )}
      </ul>
    </div>
  </div>
</div>

</div>
    

  );
};

export default Dashboard; // Export the Dashboard component