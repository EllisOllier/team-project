import React, { useState, useEffect } from "react";

const BudgetForecasting = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedBudget = localStorage.getItem("budget");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedBudget) setBudget(parseFloat(savedBudget));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // Calculate total expenses
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const currentBalance = budget - totalSpent;

  // Calculate average daily spending
  const daysTracked = new Set(expenses.map((exp) => exp.date)).size || 1;
  const avgDailySpending = totalSpent / daysTracked;

  // Forecasted balances
  const forecast1Week = currentBalance - avgDailySpending * 7;
  const forecast1Month = currentBalance - avgDailySpending * 30;

  return (
    <div>
      <div className="title-container">
        <h1>Budget Forecasting</h1>
        <h3>Plan your finances based on past spending.</h3>
      </div>

      <h3>Current Balance</h3>
      <p>£{currentBalance.toFixed(2)}</p>

      <h3>Forecasted Balance</h3>
      <p>Based on your spending trends:</p>

      <h4>In 1 Week:</h4>
      <p>£{forecast1Week.toFixed(2)}</p>

      <h4>In 1 Month:</h4>
      <p>£{forecast1Month.toFixed(2)}</p>
    </div>
  );
};

export default BudgetForecasting;