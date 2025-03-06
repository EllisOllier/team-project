const express = require("express");
const router = express.Router();

// Get controller for api route
const { addExpense } = require('../../controllers/expense/add-expense');

// Setup api route
router.post('/add-expense', addExpense);
router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = router;
