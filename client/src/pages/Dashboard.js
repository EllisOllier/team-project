// Import necessary files
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Load budget and expenses from localStorage
    const savedBudget = localStorage.getItem("budget");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedBudget) setBudget(parseFloat(savedBudget));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // Calculate total expenses
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const currentBalance = budget - totalSpent;

  // Get recent transactions (last 5)
  const recentTransactions = expenses.slice(-5).reverse();

  return (
    <div>
      <div className="title-container">
        <h1>Personal Dashboard</h1>
        <h3>Your personalized summary of recent activity.</h3>
      </div>

      <h2>Budget Summary</h2>
      <p><strong>Remaining Budget:</strong> £{currentBalance.toFixed(2)}</p>
      <p><strong>Total Spent:</strong> £{totalSpent.toFixed(2)}</p>

      <h2>Recent Transactions</h2>
      {recentTransactions.length > 0 ? (
        <ul>
          {recentTransactions.map((exp) => (
            <li key={exp.id}>
              {exp.date} - {exp.category}: £{exp.amount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent transactions.</p>
      )}

      <h2>Quick Actions</h2>
      <Link to="/expense-tracker">
        <button className="dashboard-button">Go to Expense Tracker</button>
      </Link>

      <Link to="/currency-converter">
        <button className="dashboard-button">Open Currency Converter</button>
      </Link>
    </div>
  );
};

export default Dashboard;