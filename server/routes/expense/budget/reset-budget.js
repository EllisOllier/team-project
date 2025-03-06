const express = require("express");
const router = express.Router();

// Get controller for api route
const { resetBudget } = require("../../../controllers/expense/budget/reset-budget");

// Setup api route
router.get('/reset-budget', resetBudget);
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;