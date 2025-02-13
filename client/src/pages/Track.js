import { useState, useEffect } from "react";

const ExpenseTracker = () => {
  const [budget, setBudget] = useState(() => {
    return parseFloat(localStorage.getItem("budget")) || null;
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // Save budget and expenses whenever they change
  useEffect(() => {
    if (budget !== null) localStorage.setItem("budget", budget);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleSetBudget = () => {
    const userBudget = parseFloat(prompt("Enter your budget:"));
    if (isNaN(userBudget) || userBudget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }
    setBudget(userBudget);
  };

  const addExpense = () => {
    if (!amount || !category || !date) {
      alert("Please fill all fields.");
      return;
    }
    const expenseAmount = parseFloat(amount);

    if (expenseAmount > budget) {
      alert("Not enough funds!");
      return;
    }

    const newExpense = { id: Date.now(), amount: expenseAmount, category, date };
    const updatedExpenses = [...expenses, newExpense];

    setExpenses(updatedExpenses);
    setBudget((prevBudget) => prevBudget - expenseAmount);
    setAmount("");
    setCategory("");
    setDate("");
  };

  const resetBudget = () => {
    if (window.confirm("Are you sure you want to reset your budget? This will clear all expenses.")) {
      setBudget(null);
      setExpenses([]);
      localStorage.removeItem("budget");
      localStorage.removeItem("expenses");
    }
  };

  return (
    <div>
      <div className="title-container">
        <h1>Expense Tracker</h1>
      </div>

      {budget === null ? (
        <button onClick={handleSetBudget}>Set Your Budget</button>
      ) : (
        <>
          <h3>Remaining Budget: £{budget.toFixed(2)}</h3>

          <input
            type="number"
            placeholder="Expense Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <button className="signup-button" onClick={addExpense}>Add Expense</button>

          <h3>Expense List</h3>
          <ul>
            {expenses.length > 0 ? (
              expenses.map((exp) => (
                <li key={exp.id}>
                  {exp.date} - {exp.category}: £{exp.amount}
                </li>
              ))
            ) : (
              <p>No expenses added yet.</p>
            )}
          </ul>

          <button onClick={resetBudget} style={{ backgroundColor: "red", color: "white", marginTop: "10px" }}>
            Reset Budget
          </button>
        </>
      )}
    </div>
  );
};

export default ExpenseTracker;