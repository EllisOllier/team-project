import React, { useState, useEffect } from "react";

const BudgetForecasting = () => {
  const [initialBudget, setInitialBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

  useEffect(() => {
    const savedBudget = localStorage.getItem("budget");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedBudget) setInitialBudget(parseFloat(savedBudget));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  const totalSpent = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const remainingBudget = initialBudget - totalSpent; // Fix: Correct calculation

  const daysTracked = new Set(expenses.map((exp) => exp.date)).size || 1;
  const avgDailySpending = expenses.length > 0 ? totalSpent / daysTracked : 0;

  const forecast1Week = remainingBudget - avgDailySpending * 7;
  const forecast1Month = remainingBudget - avgDailySpending * 30;

  useEffect(() => {
    if (forecast1Week < 0) {
      setWarningMessage("⚠️ Caution: Your budget may run out within a week!");
    } else if (forecast1Month < 0) {
      setWarningMessage("⚠️ Warning: You may exceed your budget in a month!");
    } else {
      setWarningMessage("");
    }
  }, [forecast1Week, forecast1Month]);

  return (
    <div>
      <div className="title-container">
        <h1>Budget Forecasting</h1>
        <h3>Plan your finances based on past spending.</h3>
      </div>

      {expenses.length === 0 ? (
        <p>No expenses recorded. Start tracking your expenses to see forecasts.</p>
      ) : (
        <div className="budget-forecasting">
          <div className="info-box">
            <h3>Current Balance</h3>
            <p className={remainingBudget < 0 ? "negative-balance" : "positive-balance"}>
              £{remainingBudget.toFixed(2)}
            </p>
          </div>

          {warningMessage && <p className="warning-message">{warningMessage}</p>}

          <div className="info-box">
            <h3>Projected Balance</h3>
            <p><strong>In 1 Week:</strong> £{forecast1Week.toFixed(2)}</p>
            <p><strong>In 1 Month:</strong> £{forecast1Month.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetForecasting;