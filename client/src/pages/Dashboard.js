import React, { useState, useEffect } from "react";
import BudgetSummary from "../components/BudgetSummary";

const Dashboard = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const savedBudget = localStorage.getItem("budget");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedBudget) setBudget(parseFloat(savedBudget));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  return (
    <div>
      <div className="title-container">
        <h1>Dashboard</h1>
        <h3>Your financial overview.</h3>
      </div>

      {/* Budget Summary Component */}
      <BudgetSummary budget={budget} expenses={expenses} />

      <h3>Recent Expenses</h3>
      <ul>
        {expenses.length > 0 ? (
          expenses.slice(-5).map((exp) => (
            <li key={exp.id}>
              {exp.date} - {exp.category}: £{exp.amount}
            </li>
          ))
        ) : (
          <p>No recent expenses.</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;