import { useState, useEffect } from "react";

const ExpenseTracker = () => {
  // Expense data variables
  const [userID, setUserID] = useState(localStorage.getItem('userID'));
  const [spendAmount, setSpendAmount] = useState('');
  const [spendCategory, setSpendCategory] = useState('');
  const [spendDate, setSpendDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [expenses, setExpenses] = useState([]);

  // User variables
  const [userBudget, setUserBudget] = useState(0);

  // Error variable
  const [errorMessage, setErrorMessage] = useState();

  // Page variables
  const categories = ["Food", "Travel", "Entertainment", "Shopping", "Bills", "Other"];

  // UseEffect functions
  useEffect(() => {
    getExpenses();
    getBudget();
  }, []);

  const addExpense = async (event) => {
    event.preventDefault();
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
        // Update the expenses state
        setExpenses([...expenses, result.expense]);
        getExpenses();
      } else {
        // Add expense failed
        setErrorMessage(result.error || 'Failed to add expense');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred');
      console.error('Unexpected error:', err);
    }
  };

  const getExpenses = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/expenses/get/get-expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID }),
      });

      const result = await response.json();
      if (response.ok) {
        // Fetched expenses successfully
        setErrorMessage('');
        // Update the expenses state
        setExpenses(result.expenses);
      } else {
        // Fetch expenses failed
        setErrorMessage(result.error || 'Failed to get expenses');
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
        // Enter any code
      } else {
        setErrorMessage(result.error || 'Failed to set budget');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred');
      console.error('Unexpected error:', err);
    }
  };

  const getBudget = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/expenses/budget/get/get-budget', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userID }),
      });

      const result = await response.json();
      if (response.ok) {
        setUserBudget(result.userBudget);
      } else {
        setErrorMessage(result.error || 'Failed to fetch budget');
      }

    } catch (err) {
      setErrorMessage('An unexpected error occurred');
      console.error('Unexpected error:', err);
    }
  }

  const handleSetBudget = () => {
    const inputBudget = parseFloat(prompt("Enter your budget:"));
    if (isNaN(inputBudget) || inputBudget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }
    setUserBudget(inputBudget);
    setBudget(inputBudget); // Pass inputBudget directly to setBudget
  };

  const resetBudget = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/expenses/reset/reset-budget-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userID }),
      });

      const result = await response.json();
      if (response.ok) {
        // Reset budget and expenses successfully
        setUserBudget(0);
        setExpenses([]);
      } else {
        setErrorMessage(result.error || 'Failed to reset budget and expenses');
      }

    } catch (err) {
      setErrorMessage('An unexpected error occurred');
      console.error('Unexpected error:', err);
    }
  };

  // Calculate total spent and correct remaining balance
  const totalSpent = expenses.reduce((sum, expense) => sum + Number(expense?.spendAmount || 0), 0);
  const remainingBudget = userBudget - totalSpent;

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
            
          </div>

          <h3>Expense List</h3>
          <ul>
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                expense && (
                  <li key={expense.id}>
                    {expense.spendDate} - {expense.spendCategory}: £{expense.spendAmount}
                  </li>
                )
              ))
            ) : (
              <p>No expenses found</p>
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