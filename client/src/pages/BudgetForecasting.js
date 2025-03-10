import React, { useState } from "react";

const BudgetForecasting = () => {
  const [expenses, setExpenses] = useState([]);
  const [warningMessage, setWarningMessage] = useState("");

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
            <p>
              £
            </p>
          </div>

          {warningMessage && <p className="warning-message">{warningMessage}</p>}

          <div className="info-box">
            <h3>Projected Balance</h3>
            <p><strong>In 1 Week:</strong> £</p>
            <p><strong>In 1 Month:</strong> £</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetForecasting;