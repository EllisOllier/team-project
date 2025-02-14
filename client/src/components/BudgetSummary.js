import React from "react";

const BudgetSummary = ({ budget, expenses }) => {
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = budget - totalSpent;
  const savingsPercentage = ((remainingBudget / budget) * 100).toFixed(2);

  // Calculate category breakdown
  const categoryBreakdown = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  return (
    <div>
      <h2>Budget Summary</h2>
      <p><strong>Total Budget:</strong> £{budget.toFixed(2)}</p>
      <p><strong>Total Spent:</strong> £{totalSpent.toFixed(2)}</p>
      <p><strong>Remaining Budget:</strong> £{remainingBudget.toFixed(2)}</p>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${savingsPercentage}%` }}></div>
      </div>
      <p>{savingsPercentage}% of your budget remains.</p>

      {/* Category Breakdown */}
      <h3>Spending Breakdown</h3>
      {Object.keys(categoryBreakdown).length > 0 ? (
        <ul>
          {Object.entries(categoryBreakdown).map(([category, amount]) => (
            <li key={category}>
              {category}: £{amount} ({((amount / totalSpent) * 100).toFixed(2)}%)
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses recorded yet.</p>
      )}
    </div>
  );
};

export default BudgetSummary;