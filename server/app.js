// Import modules
const express = require("express");

const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// App
const app = express();

// Middleware
































app.use(morgan("dev"));
app.use(cors({origin : true, credentials : true}));
app.use(express.json()); // Add this line to parse JSON request bodies

// Routes
// Declare validateLogin route
const validateLogin = require("./routes/account/validate-login");
app.use("/api/user", validateLogin);

// Declare createAccount route
const createAccount = require("./routes/account/create-account");
app.use("/api/check", createAccount);

// Declare checkApi route
const checkApi = require("./routes/api-check");
app.use("/api/status-check", checkApi);

// Declare addExpense route
const addExpense = require("./routes/expense/add-expense");
app.use("/api/expenses/add", addExpense);

// Declare setBudget route
const setBudget = require("./routes/expense/budget/set-budget");
app.use("/api/expenses/budget/set", setBudget);

// Declare getBudget route
const getBudget = require("./routes/expense/budget/get-budget");
app.use("/api/expenses/budget/get", getBudget);

// Declare resetBudget route
const resetBudget = require("./routes/expense/budget/reset-budget");
app.use("/api/expenses/budget/reset", resetBudget);

// Declare getExpenses route
const getExpenses = require("./routes/expense/get-expenses");
app.use("/api/expenses/get", getExpenses);

// Declare resetBudgetExpenses route
const resetBudgetExpenses = require("./routes/expense/reset-budget-expense");
app.use("/api/expenses/reset", resetBudgetExpenses);

// Use middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); // Middleware to parse JSON request bodies

// Define a catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Server Port
const port = process.env.PORT || 8080;

// Listener
const server = app.listen(port, () => 
    console.log(`Server is running on ${port}`)
);