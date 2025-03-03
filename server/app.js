// import modules
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();

// middleware
app.use(morgan("dev"));
app.use(cors({origin : true, credentials : true}));
app.use(express.json()); // Add this line to parse JSON request bodies

// routes
const validateLogin = require("./routes/account/validate-login");
app.use("/api/user", validateLogin);

const createAccount = require("./routes/account/create-account");
app.use("/api/check", createAccount);

const checkApi = require("./routes/api-check");
app.use("/api/status-check", checkApi);

const addExpense = require("./routes/expense/add-expense");
app.use("/api/expenses/add", addExpense);

const setBudget = require("./routes/expense/budget/set-budget");
app.use("/api/expenses/budget/set", setBudget);

const getBudget = require("./routes/expense/budget/get-budget");
app.use("/api/expenses/budget/get", getBudget);

const resetBudget = require("./routes/expense/budget/reset-budget");
app.use("/api/expenses/budget/reset", resetBudget);

const getExpenses = require("./routes/expense/get-expenses");
app.use("/api/expenses/get", getExpenses);

const resetBudgetExpenses = require("./routes/expense/reset-budget-expense");
app.use("/api/expenses/reset", resetBudgetExpenses);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json()); // Middleware to parse JSON request bodies



// Define a catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// end of test post api

// port
const port = process.env.PORT || 8080;

// listener
const server = app.listen(port, () => 
    console.log(`Server is running on ${port}`)
);
