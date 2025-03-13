const express = require("express");
const router = express.Router();

// Get controller for api route
const { removeExpense } = require("../../controllers/expense/remove-expense");

// Setup api route
router.post('/remove-expense', removeExpense);
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;