import { useState, useEffect } from "react";

const ExpenseTracker = () => {
  // Expense data variables
  const [userID, setUserID] = useState(localStorage.getItem("userID"));
  const [spendAmount, setSpendAmount] = useState("");
  const [spendCategory, setSpendCategory] = useState("");
  const [spendDate, setSpendDate] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [userBudget, setUserBudget] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  // Sorting & Filtering
  const [sortBy, setSortBy] = useState("date");
  const [filterCategory, setFilterCategory] = useState("");

  const categories = ["Food", "Travel", "Entertainment", "Shopping", "Bills", "Other"];

  useEffect(() => {
    getExpenses();
    getBudget();
  }, []);

  useEffect(() => {
    setExpenses([...expenses]); // Force re-render when sorting/filtering changes
  }, [sortBy, filterCategory]);

  // Fetch Expenses
  const getExpenses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses/get/get-expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID }),
      });

      const result = await response.json();
      if (response.ok) {
        setExpenses(result.expenses);
        setErrorMessage("");
      } else {
        setErrorMessage(result.error || "Failed to get expenses");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Unexpected error:", err);
    }
  };

  // Add Expense
  const addExpense = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/expenses/add/add-expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID, spendAmount, spendCategory, spendDate, isRecurring }),
      });

      const result = await response.json();
      if (response.ok) {
        setExpenses([...expenses, result.expense]);
        setErrorMessage("");
        getExpenses();
      } else {
        setErrorMessage(result.error || "Failed to add expense");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Unexpected error:", err);
    }
  };

  const removeExpense = async (spendID) => {
    try {
      const response = await fetch(`http://localhost:8080/api/expenses/remove/remove-expense`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spendID }),
      });
  
      const result = await response.json();
      if (response.ok) {
        setExpenses(expenses.filter(expense => expense.spendID !== spendID));
        setErrorMessage("");
      } else {
        setErrorMessage(result.error || "Failed to remove expense");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Unexpected error:", err);
    }
  };

  // Fetch Budget
  const getBudget = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses/budget/get/get-budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID }),
      });

      const result = await response.json();
      if (response.ok) {
        setUserBudget(result.userBudget);
      } else {
        setErrorMessage(result.error || "Failed to fetch budget");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Unexpected error:", err);
    }
  };
  const handleSetBudget = () => {
    const inputBudget = parseFloat(prompt("Enter your budget"));
    if (isNaN(inputBudget) || inputBudget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }
    setUserBudget(inputBudget);
    setBudget(inputBudget);
  }
  // Set Budget
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

  // Reset Budget & Expenses
  const resetBudget = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses/reset/reset-budget-expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID }),
      });

      const result = await response.json();
      if (response.ok) {
        setUserBudget(0);
        setExpenses([]);
      } else {
        setErrorMessage(result.error || "Failed to reset budget and expenses");
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred");
      console.error("Unexpected error:", err);
    }
  };

  // Sorting & Filtering Logic
  const filteredExpenses = expenses
    .filter((expense) => (filterCategory ? expense.spendCategory === filterCategory : true))
    .sort((a, b) => {
      if (sortBy === "amount") return Number(b.spendAmount) - Number(a.spendAmount);
      if (sortBy === "date") return new Date(b.spendDate) - new Date(a.spendDate);
      return 0;
    });

  // Store the remaining budget to the local storage
  const updateLocalStorage = (budget, totalSpent, remainingBudget) => {
    localStorage.setItem('userBudget', budget);
    localStorage.setItem('totalSpent', totalSpent);
    localStorage.setItem('remainingBudget', remainingBudget);
  }

  // Update the remaining budget and the local storage
  const updateBudget = (event) => {
    setSpendAmount(event.target.value);
    updateLocalStorage(userBudget, totalSpent, remainingBudget);
  }

  // Calculate total spent
  const totalSpent = expenses.reduce((sum, expense) => sum + Number(expense?.spendAmount || 0), 0);
  const remainingBudget = userBudget - totalSpent;
  updateLocalStorage(userBudget, totalSpent, remainingBudget);

  return (
    <div>
      <div className="title-container">
        <h1>Expense Tracker</h1>
        <h3>Keep track of your expenses on the fly!</h3>
      </div>
      <div className="expense-tracker-container">
      {userBudget === 0 ? (
        <div id="set-budget-container">
          <h3>Ohh. It looks like you don't have a budget lets get one setup.</h3>
          <button  id="set-budget-button" onClick={handleSetBudget}>Set Your Budget</button>
        </div>
        
        ) : (
          <>
            <h3>Remaining Budget: £{remainingBudget.toFixed(2)}</h3>
            <div className="add-expense-container">
              <div className="expense-form">
                <input
                  type="number"
                  placeholder="Expense Amount"
                  value={spendAmount}
                  onChange={(e) => updateBudget(e)} 
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
              </div>
              <button className="button" onClick={addExpense}>Add Expense</button>
            </div>

            <div className="sort-filter-container">
              <h3>Sort & Filter</h3>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="date">Sort by Date</option>
                <option value="amount">Sort by Amount</option>
              </select>
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="expense-list-container">
              <h3>Expense List</h3>
              <ul>
                {filteredExpenses.length > 0 ? (
                  filteredExpenses.map((expense, index) => (
                    <li key={index}>
                      {expense?.spendDate} - {expense?.spendCategory}: £{expense?.spendAmount}
                      <button onClick={() => removeExpense(expense.spendID)}style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <i className="fas fa-times"></i>
                      </button>
                    </li>
                  ))
                ) : (
                  <p>No expenses found</p>
                )}
              </ul>
            </div>
            <button onClick={resetBudget} id="reset-button">Reset Budget</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpenseTracker;