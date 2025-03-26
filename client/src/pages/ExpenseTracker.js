import { useState, useEffect } from "react";

const ExpenseTracker = () => {

  // State Variables

  // User and Expense data
  const [userID, setUserID] = useState(() => localStorage.getItem("userID") || ""); // Get user ID from localStorage
  console.log("User ID: ", userID); // Log user ID to console
  const [spendAmount, setSpendAmount] = useState(""); // Input: amount to spend
  const [spendCategory, setSpendCategory] = useState(""); // Input: category of expense
  const [spendDate, setSpendDate] = useState(""); // Input: date of expense
  const [expenses, setExpenses] = useState([]); // Array to store all expenses
  const [userBudget, setUserBudget] = useState(0); // User's set budget
  const [errorMessage, setErrorMessage] = useState(""); // Error message handling

  // Sorting and Filtering options
  const [sortBy, setSortBy] = useState("date"); // Default sort by date
  const [filterCategory, setFilterCategory] = useState(""); // Filter expenses by category

  // Predefined categories
  const categories = ["Food", "Travel", "Entertainment", "Shopping", "Bills", "Other"];

  // Fetch data on component mount

  useEffect(() => {
    getExpenses(); // Fetch expenses from the server on load
    getBudget();   // Fetch budget from the server on load
  }, []);

  // Update the expense list whenever sort/filter changes
  useEffect(() => {
    setExpenses([...expenses]); // Forces a re-render of the expenses list
  }, [sortBy, filterCategory]);

  // Fetch expenses from API

  const getExpenses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses/get/get-expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID }),
      });

      const result = await response.json();

      if (response.ok) {
        setExpenses(result.expenses); // Update expenses state
        setErrorMessage(""); // Clear any error messages
      } else {
        setErrorMessage(result.error || "Failed to get expenses");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Unexpected error:", err);
    }
  };

  // Add a new expense via API

  const addExpense = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    if (spendAmount <= 0) {
      alert("Amount is too low, Enter a valid amount"); // Display alert message
      return; // Exit the function if the amount is invalid
    }

    if (spendAmount > remainingBudget) {
      alert(`Amount exceeds the remaining budget. Remaining budget: £${remainingBudget}`);
      return; // Exit the function if the amount exceeds the remaining budget
    }

    if (!spendCategory) {
      alert("Please select a category for the expense.");
      return; // Exit the function if no category is selected
    }

    if (!spendDate) {
      alert("Please enter a date for the expense.");
      return; // Exit the function if no date is entered
    }

    try {
      const response = await fetch("http://localhost:8080/api/expenses/add/add-expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userID, 
          spendAmount: parseFloat(spendAmount),//Converts to a float(number)
          spendCategory, 
          spendDate 
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setExpenses([...expenses, result.expense]); // Add the new expense locally
        setErrorMessage(""); // Clear error
        getExpenses(); // Refresh expenses list from server
      } else {
        setErrorMessage(result.error || "Failed to add expense");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Unexpected error:", err);
    }
  };

  // Remove an expense via API

  const removeExpense = async (spendID) => {
    try {
      const response = await fetch(`http://localhost:8080/api/expenses/remove/remove-expense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spendID }),
      });
  
      const result = await response.json();

      if (response.ok) {
        setExpenses(expenses.filter(expense => expense.spendID !== spendID)); // Remove locally
        setErrorMessage(""); // Clear error
      } else {
        setErrorMessage(result.error || "Failed to remove expense");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Unexpected error:", err);
    }
  };

  // Fetch budget from API

  const getBudget = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses/budget/get/get-budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID }),
      });

      const result = await response.json();

      if (response.ok) {
        setUserBudget(result.userBudget); // Update user's budget
      } else {
        setErrorMessage(result.error || "Failed to fetch budget");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Unexpected error:", err);
    }
  };

  // Prompt user to set their budget

  const handleSetBudget = () => {
    const inputBudget = parseFloat(prompt("Enter your budget")); // Prompt for budget input
    if (isNaN(inputBudget) || inputBudget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }

    setUserBudget(inputBudget); // Update state immediately
    setBudget(inputBudget);     // Update on server
  };

  // Update user's budget via API

  const setBudget = async (budget) => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses/budget/set/set-budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, userBudget: budget }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "Failed to set budget");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Unexpected error:", err);
    }
  };

  // Reset user's budget and expenses via API

  const resetBudget = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses/reset/reset-budget-expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID }),
      });

      const result = await response.json();

      if (response.ok) {
        setUserBudget(0);      // Reset state
        setExpenses([]);       // Clear expenses
      } else {
        setErrorMessage(result.error || "Failed to reset budget and expenses");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Unexpected error:", err);
    }
  };

  // Apply filtering and sorting to expenses

  const filteredExpenses = expenses
    .filter((expense) => (
      filterCategory ? expense.spendCategory === filterCategory : true
    ))
    .sort((a, b) => {
      if (sortBy === "amount") return Number(b.spendAmount) - Number(a.spendAmount);
      if (sortBy === "date") return new Date(b.spendDate) - new Date(a.spendDate);
      return 0;
    });

  // Local storage updates

  // Store budget values in local storage
  const updateLocalStorage = (budget, totalSpent, remainingBudget) => {
    localStorage.setItem('userBudget', budget);
    localStorage.setItem('totalSpent', totalSpent);
    localStorage.setItem('remainingBudget', remainingBudget);
  };

  // Update spend amount and store budget values
  const updateBudget = (event) => {
    setSpendAmount(event.target.value); // Update spend amount state
    updateLocalStorage(userBudget, totalSpent, remainingBudget); // Save to localStorage
  };

  // Budget calculations

  const totalSpent = expenses.reduce((sum, expense) => (
    sum + Number(expense?.spendAmount || 0)
  ), 0); // Calculate total amount spent

  const remainingBudget = userBudget - totalSpent; // Remaining budget calculation

  // Sync with local storage
  updateLocalStorage(userBudget, totalSpent, remainingBudget);

  // JSX Rendering

  return (
    <div>
      {/* Header */}
      <div className="title-container">
        <h1>Expense Tracker</h1>
        <h3>Keep track of your expenses on the fly!</h3>
      </div>

      {/* Main container */}
      <div className="expense-tracker-container">
        {userBudget === 0 ? (
          // If no budget set, prompt user to set one
          <div id="set-budget-container">
            <h3>Ohh. It looks like you don't have a budget. Let's get one set up.</h3>
            <button id="set-budget-button" onClick={handleSetBudget}>
              Set Your Budget
            </button>
          </div>
        ) : (
          <>
            {/* Budget Info */}
            <h3>Remaining Budget: £{remainingBudget.toFixed(2)}</h3>

            {/* Add Expense Form */}
            <div className="add-expense-container">
              <div className="expense-form">
                <input
                  type="number"
                  placeholder="Expense Amount"
                  value={spendAmount}
                  onChange={(e) => updateBudget(e)}
                  
                />
                <select
                  value={spendCategory}
                  onChange={(e) => setSpendCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <input
                  type="date"
                  value={spendDate}
                  onChange={(e) => setSpendDate(e.target.value)}
                />
              </div>
              <button className="button" onClick={addExpense}>Add Expense</button>
            </div>

            {/* Sort & Filter */}
            <div className="sort-filter-container">
              <h3>Sort & Filter</h3>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
              </select>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Expenses List */}
            <div className="expense-list-container">
              <h3>Expense History List</h3>
              <ul>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense, index) => (
                    <li key={index}>
                      {expense?.spendDate} - {expense?.spendCategory}: £{expense?.spendAmount}
                      <button
                        onClick={() => removeExpense(expense.spendID)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </li>
                  ))
                ) : (
                  <p>No expenses found</p>
                )}
              </ul>
            </div>

            {/* Reset Budget Button */}
            <button onClick={resetBudget} id="reset-button">
              Reset Budget
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;