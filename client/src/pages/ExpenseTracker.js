import { useState, useEffect } from "react";

const ExpenseTracker = () => {
  const [userID, setUserID] = useState(localStorage.getItem('userID'));
  const [spendAmount, setSpendAmount] = useState('');
  const [spendCategory, setSpendCategory] = useState('');
  const [spendDate, setSpendDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userBudget, setUserBudget] = useState(() => {
    const storedBudget = localStorage.getItem("userBudget");
    return storedBudget ? parseFloat(storedBudget) : 0;
  });
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });
  const [recurringExpenses, setRecurringExpenses] = useState(() => {
    const savedRecurringExpenses = localStorage.getItem("recurringExpenses");
    return savedRecurringExpenses ? JSON.parse(savedRecurringExpenses) : [];
  });
  const [sortBy, setSortBy] = useState("date");
  const [filterByCategory, setFilterByCategory] = useState("");

  const categories = ["Food", "Travel", "Entertainment", "Shopping", "Bills", "Other"];

  useEffect(() => {
    localStorage.setItem("userBudget", userBudget);
  }, [userBudget]);

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
    if (today.getDate() === 1) {
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

  const addExpense = async (event) => {
    event.preventDefault();
    console.log(`${userID}, ${spendAmount}, ${spendCategory}, ${spendDate}, ${isRecurring}`);
    try {
      const response = await fetch('http://localhost:8080/api/expenses/add/add-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID, spendAmount, spendCategory, spendDate, isRecurring }),
      });

      const result = await response.json();
      if (response.ok) {
        // Added expense successfully
        setErrorMessage('');
        console.log('Successfully added expense!', result);
      } else {
        // Add expense failed
        setErrorMessage(result.error || 'Failed to add expense');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred');
      console.error('Unexpected error:', err);
    }
  };

  const setBudget = async (budget) => {
    try {
      const response = await fetch('http://localhost:8080/api/expenses/budget/set/set-budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userID, userBudget: budget }), // Pass budget directly
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Successfully set budget!', result);
      } else {
        setErrorMessage(result.error || 'Failed to set budget');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred');
      console.error('Unexpected error:', err);
    }
  };

  const handleSetBudget = () => {
    const inputBudget = parseFloat(prompt("Enter your budget:"));
    if (isNaN(inputBudget) || inputBudget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }
    setUserBudget(inputBudget);
    setBudget(inputBudget); // Pass inputBudget directly to setBudget
  };

  const resetBudget = () => {
    if (window.confirm("Are you sure you want to reset your budget? This will clear all expenses.")) {
      setUserBudget(0);
      setExpenses([]);
      localStorage.removeItem("userBudget");
      localStorage.removeItem("expenses");
      localStorage.removeItem("recurringExpenses");
    }
  };

  // Calculate total spent and correct remaining balance
  const totalSpent = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const remainingBudget = userBudget - totalSpent; // Fix: Correct calculation

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

      {userBudget === 0 ? (
        <button className="dashboard-button" onClick={handleSetBudget}>Set Your Budget</button>
      ) : (
        <>
          <h3>Remaining Budget: £{remainingBudget.toFixed(2)}</h3>

          <input
            type="number"
            placeholder="Expense Amount"
            value={spendAmount}
            onChange={(e) => setSpendAmount(e.target.value)}
          />

          <select value={spendCategory} onChange={(e) => setSpendCategory(e.target.value)}>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input type="date" value={spendDate} onChange={(e) => setSpendDate(e.target.value)} />
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