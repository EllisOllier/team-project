const express = require("express");
const router = express.Router();

// Get controller for api route
const { resetBudgetExpenses } = require("../../controllers/expense/reset-budget-expense");

// Setup api route
router.post('/reset-budget-expense', resetBudgetExpenses);
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;