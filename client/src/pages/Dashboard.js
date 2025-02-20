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
  const totalSpent = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const currentBalance = budget - totalSpent;

  // Determine budget status (color-coded)
  const budgetStatus = budget > 0 ? currentBalance / budget : 0;
  const balanceClass =
    budgetStatus > 0.5 ? "positive-balance" :
    budgetStatus > 0.2 ? "warning-balance" :
    "negative-balance";

  // Get recent transactions (last 5)
  const recentTransactions = expenses.slice(-5).reverse();

  return (
    <div>
      {/* Title Container */}
      <div className="title-container">
        <h1>Personal Dashboard</h1>
        <h3>Welcome back! Keep your finances on track. 🚀</h3>
      </div>

      {/* Budget Summary */}
      <h2>Budget Summary</h2>
      <p className={balanceClass}><strong>Remaining Budget:</strong> £{currentBalance.toFixed(2)}</p>
      <p><strong>Total Spent:</strong> £{totalSpent.toFixed(2)}</p>

      {/* Recent Transactions */}
      <h2>Recent Transactions</h2>
      {recentTransactions.length > 0 ? (
        <ul>
          {recentTransactions.map((exp) => (
            <li key={exp.id}>
              <span className={`expense-category ${exp.category.toLowerCase()}`}>
                {exp.category}
              </span> - <strong>£{exp.amount.toFixed(2)}</strong> on {new Date(exp.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent transactions.</p>
      )}

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