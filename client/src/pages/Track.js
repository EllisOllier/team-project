import { useState, useEffect } from "react";

const ExpenseTracker = () => {
  const [budget, setBudget] = useState(() => {
    const storedBudget = localStorage.getItem("budget");
    return storedBudget ? parseFloat(storedBudget) : 0; // Fix: Prevent NaN issues
  });

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [recurringExpenses, setRecurringExpenses] = useState(() => {
    const savedRecurringExpenses = localStorage.getItem("recurringExpenses");
    return savedRecurringExpenses ? JSON.parse(savedRecurringExpenses) : [];
  });

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);

  const [sortBy, setSortBy] = useState("date");
  const [filterByCategory, setFilterByCategory] = useState("");

  const categories = ["Food", "Travel", "Entertainment", "Shopping", "Bills", "Other"];

  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("recurringExpenses", JSON.stringify(recurringExpenses));
  }, [recurringExpenses]);

  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    if (today.getDate()=== 1) {
    const newExpenses = recurringExpenses.map(exp => {
      const expenseDate = new Date(exp.date);
      if (expenseDate.getMonth() !== currentMonth || expenseDate.getFullYear() !== currentYear) {
        return { ...exp, date: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(expenseDate.getDate()).padStart(2, '0')}` };
      }
      return exp;
    });

    setExpenses([...expenses, ...newExpenses]);
    }
}, [recurringExpenses]);


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

    if (expenseAmount > budget || budget === 0) {
      alert("Not enough funds!");
      return;
    }

    const newExpense = { id: Date.now(), amount: expenseAmount, category, date };
    setExpenses([...expenses, newExpense]);
    setBudget((prevBudget) => prevBudget - expenseAmount);

    if (isRecurring) {
      setRecurringExpenses([...recurringExpenses, newExpense]);
    }

    setAmount("");
    setCategory(""); // Fix: Reset to placeholder text
    setDate("");
    setIsRecurring(false);
  };

  const resetBudget = () => {
    if (window.confirm("Are you sure you want to reset your budget? This will clear all expenses.")) {
      setBudget(0);
      setExpenses([]);
      localStorage.removeItem("budget");
      localStorage.removeItem("expenses");
      localStorage.removeItem("recurringExpenses");
    }
  };

  const sortedExpenses = [...expenses].sort((a, b) => {
    if (sortBy === "amount") return b.amount - a.amount;
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return new Date(a.date) - new Date(b.date); // Fix: Consistent date parsing
  });

  const filteredExpenses = filterByCategory
    ? sortedExpenses.filter(exp => exp.category === filterByCategory)
    : sortedExpenses;

  return (
    <div>
      <div className="title-container">
        <h1>Expense Tracker</h1>
      </div>

      {budget === 0 ? (
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

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <label>
            <input type="checkbox" checked={isRecurring} onChange={(e) => setIsRecurring(e.target.checked)} />
            Recurring
          </label>
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