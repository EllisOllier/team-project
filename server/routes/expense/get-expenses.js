const express = require("express");
const router = express.Router();

// Get controller for api route
const { getExpenses } = require("../../controllers/expense/get-expenses");

// Setup api route
router.post('/get-expenses', getExpenses);
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;