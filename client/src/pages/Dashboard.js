// Import necessary files
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);


  return (
    <div>
      {/* Title Container */}
      <div className="title-container">
        <h1>Personal Dashboard</h1>
        <h3>Welcome back! Keep your finances on track. 🚀</h3>
      </div>

      {/* Budget Summary */}
      <h2>Budget Summary</h2>
      <p ><strong>Remaining Budget:</strong> £</p>
      <p><strong>Total Spent:</strong> £</p>

      {/* Recent Transactions */}
      <h2>Recent Transactions</h2>

      {/* View More Transactions Button */}
      {expenses.length > 5 && (
        <Link to="/expense-tracker">
          <button className="dashboard-button">📜 View All Transactions</button>
        </Link>
      )}

      {/* Quick Actions Section */}
      <h2>Quick Actions</h2>
      <Link to="/expense-tracker">
        <button className="dashboard-button">💰 Go to Expense Tracker</button>
      </Link>

      <Link to="/currency-converter">
        <button className="dashboard-button">🔄 Open Currency Converter</button>
      </Link>

      <Link to="/budget-forecasting">
        <button className="dashboard-button">📊 Budget Forecast</button>
      </Link>
    </div>
  );
};

export default Dashboard;