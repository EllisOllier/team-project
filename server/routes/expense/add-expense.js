const express = require("express");
const router = express.Router();

// import controllers
const { addExpense } = require('../../controllers/expense/add-expense');

// api routes
router.post('/add-expense', addExpense);
router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = router;
