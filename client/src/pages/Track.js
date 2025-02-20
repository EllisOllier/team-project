import { useState, useEffect } from "react";

const ExpenseTracker = () => {
  const [initialBudget, setInitialBudget] = useState(() => {
    const storedBudget = localStorage.getItem("budget");
    return storedBudget ? parseFloat(storedBudget) : 0;
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const [sortBy, setSortBy] = useState("date");
  const [filterByCategory, setFilterByCategory] = useState("");

  const categories = ["Food", "Travel", "Entertainment", "Shopping", "Bills", "Other"];

  useEffect(() => {
    localStorage.setItem("budget", initialBudget);
  }, [initialBudget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleSetBudget = () => {
    const userBudget = parseFloat(prompt("Enter your budget:"));
    if (isNaN(userBudget) || userBudget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }
    setInitialBudget(userBudget);
  };

  const addExpense = () => {
    if (!amount || !category || !date) {
      alert("Please fill all fields.");
      return;
    }
    const expenseAmount = parseFloat(amount);

    if (expenseAmount > remainingBudget) {
      alert("Not enough funds!");
      return;
    }

    const newExpense = { id: Date.now(), amount: expenseAmount, category, date };
    setExpenses([...expenses, newExpense]);

    setAmount("");
    setCategory("");
    setDate("");
  };

  const resetBudget = () => {
    if (window.confirm("Are you sure you want to reset your budget? This will clear all expenses.")) {
      setInitialBudget(0);
      setExpenses([]);
      localStorage.removeItem("budget");
      localStorage.removeItem("expenses");
    }
  };

  // Calculate total spent and correct remaining balance
  const totalSpent = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const remainingBudget = initialBudget - totalSpent; // Fix: Correct calculation

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === "amount") return b.amount - a.amount;
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return new Date(a.date) - new Date(b.date);
  });

  const filteredExpenses = filterByCategory
    ? sortedExpenses.filter(exp => exp.category === filterByCategory)
    : sortedExpenses;

  return (
    <div>
      <div className="title-container">
        <h1>Expense Tracker</h1>
      </div>

      {initialBudget === 0 ? (
        <button className="dashboard-button" onClick={handleSetBudget}>Set Your Budget</button>
      ) : (
        <>
          <h3>Remaining Budget: £{remainingBudget.toFixed(2)}</h3>

          <input
            type="number"
            placeholder="Expense Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <button className="signup-button" onClick={addExpense}>Add Expense</button>

          <h3>Sort & Filter</h3>
          <div>
            <label>Sort By: </label>
            <select onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>

            <label> Filter by Category: </label>
            <select onChange={(e) => setFilterByCategory(e.target.value)}>
              <option value="">All</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <h3>Expense List</h3>
          <ul>
            {filteredExpenses.length > 0 ? (
              filteredExpenses.map((exp) => (
                <li key={exp.id}>
                  {exp.date} - {exp.category}: £{exp.amount}
                </li>
              ))
            ) : (
              <p>No expenses match the criteria.</p>
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