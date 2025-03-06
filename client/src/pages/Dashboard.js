// Import necessary files
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userBudget, setUserBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [spendAmount, setSpendAmount] = useState("");
  const [spendCategory, setSpendCategory] = useState("");
  const [spendDate, setSpendDate] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sorting & Filtering
  const [sortBy, setSortBy] = useState("date");
  const [filterCategory, setFilterCategory] = useState("");

  const categories = ["Food", "Travel", "Entertainment", "Shopping", "Bills", "Other"];

  useEffect(() => {
    getExpenses();
    getBudget();
  }, []);

  useEffect(() => {
    calculateTotalSpent();
  }, [expenses]);

  useEffect(() => {
    calculateRemainingBudget();
  }, [totalSpent, userBudget]);

  useEffect(() => {
    setUsername(`, ${localStorage.getItem('username')}`);
  }, []);

  // Fetch Expenses
  const getExpenses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses/get/get-expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID }),
      });

      const result = await response.json();
      if (response.ok) {
        setExpenses(result.expenses);
        setErrorMessage("");
        localStorage.setItem('expenses', JSON.stringify(result.expenses)); // Store expenses as JSON string
      } else {
        setErrorMessage(result.error || "Failed to get expenses");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Unexpected error:", err);
    }
  };

  // Fetch Budget
  const getBudget = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses/budget/get/get-budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID }),
      });

      const result = await response.json();
      if (response.ok) {
        setUserBudget(result.userBudget);
        localStorage.setItem('userBudget', result.userBudget);
      } else {
        setErrorMessage(result.error || "Failed to fetch budget");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Unexpected error:", err);
    }
  };

  const calculateTotalSpent = () => {
    const total = expenses.reduce((sum, expense) => sum + Number(expense.spendAmount), 0);
    setTotalSpent(total);
  };

  const calculateRemainingBudget = () => {
    const result = userBudget - totalSpent;
    setRemainingBudget(result);
  }

  return (
    <div>
      {/* Title Container */}
      <div className="title-container">
        <h1>Personal Dashboard</h1>
        <h3>Welcome back{username}! Keep your finances on track. 🚀</h3>
      </div>

      {/* Budget Summary */}
      <h2>Budget Summary</h2>
      <p><strong>Remaining Budget:</strong> £{remainingBudget}</p>
      <p><strong>Total Spent:</strong> £{totalSpent}</p>

      {/* Recent Transactions */}
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