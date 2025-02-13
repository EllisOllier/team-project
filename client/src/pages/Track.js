import { useState, useEffect } from "react";

const ExpenseTracker = () => {
  const [budget, setBudget] = useState(null); // Initially null to prompt user input
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  // Load saved budget and expenses from local storage
  useEffect(() => {
    const savedBudget = localStorage.getItem("budget");
    const savedExpenses = localStorage.getItem("expenses");

    if (savedBudget) setBudget(parseFloat(savedBudget));
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
  }, []);

  // Save budget and expenses whenever they change
  useEffect(() => {
    if (budget !== null) localStorage.setItem("budget", budget);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [budget, expenses]);

  // Set initial budget
  const handleSetBudget = () => {
    const userBudget = parseFloat(prompt("Enter your budget:"));
    if (isNaN(userBudget) || userBudget <= 0) {
      alert("Please enter a valid budget.");
      return;
    }
    setBudget(userBudget);
  };

  // Add new expense
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
    setExpenses([...expenses, newExpense]);
    setBudget((prevBudget) => prevBudget - expenseAmount); // Deduct from budget
    setAmount("");
    setCategory("");
    setDate("");
  };

  return (
    <div>
      <h2>Expense Tracker</h2>

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
            {expenses.map((exp) => (
              <li key={exp.id}>
                {exp.date} - {exp.category}: £{exp.amount}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ExpenseTracker;