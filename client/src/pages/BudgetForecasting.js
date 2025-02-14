import React, { useState, useEffect } from "react";

const BudgetForecasting = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

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

  // Display warning if balance is projected to go negative
  useEffect(() => {
    if (forecast1Month < 0) {
      setWarningMessage("⚠️ Warning: You may exceed your budget in a month!");
    } else if (forecast1Week < 0) {
      setWarningMessage("⚠️ Caution: Your budget may run out within a week!");
    } else {
      setWarningMessage("");
    }
  }, [forecast1Week, forecast1Month]);

  return (
    <div className="budget-forecasting">
      <h1>Budget Forecasting</h1>
      <h3>Plan your finances based on past spending.</h3>

      <div className="info-box">
        <h3>Current Balance</h3>
        <p className={currentBalance < 0 ? "negative-balance" : "positive-balance"}>
          £{currentBalance.toFixed(2)}
        </p>
      </div>

      {warningMessage && <p className="warning-message">{warningMessage}</p>}

      <div className="info-box">
        <h3>Projected Balance</h3>
        <p><strong>In 1 Week:</strong> £{forecast1Week.toFixed(2)}</p>
        <p><strong>In 1 Month:</strong> £{forecast1Month.toFixed(2)}</p>
      </div>

      <div className="forecast-details">
        <p><strong>Daily Spending Rate:</strong> £{avgDailySpending.toFixed(2)}</p>
        <p>Keep track of your expenses to stay within budget.</p>
      </div>
    </div>
  );
};

export default BudgetForecasting;