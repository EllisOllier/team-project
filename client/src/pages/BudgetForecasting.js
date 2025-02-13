// Import necessary files
import React, { useState, useEffect } from 'react';

const BudgetForecasting = () => {
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

  // Calculate average daily spending
  const daysTracked = new Set(expenses.map(exp => exp.date)).size || 1;
  const avgDailySpending = totalSpent / daysTracked;

  // Forecasted balances
  const forecast1Week = currentBalance - avgDailySpending * 7;
  const forecast1Month = currentBalance - avgDailySpending * 30;

  return (
    <div>
      <div className="title-container">
        <h1>Budget Forecasting</h1>
        <h3>A guide to help with managing your budget throughout the semester.</h3>
      </div>
      <h2>Summary</h2>
      <br />
      <h3>Current Balance</h3>
      <p>£{currentBalance.toFixed(2)}</p>
      <br />
      <h3>Forecasted Balance</h3>
      <p>Based on your spending habits.</p>
      <br />
      <h2>Forecast Chart</h2>
      <br />
      {/* Insert chart component here */}
      <br />
      <p>Forecasted balance in 1 week:</p>
      <p>£{forecast1Week.toFixed(2)}</p>
      <br />
      <p>Forecasted balance in 1 month:</p>
      <p>£{forecast1Month.toFixed(2)}</p>
      <br />
    </div>
  );
};

export default BudgetForecasting;