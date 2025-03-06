const express = require("express");
const router = express.Router();

// Get controller for api route
const { getBudget } = require("../../../controllers/expense/budget/get-budget");

// Setup api route
router.post('/get-budget', getBudget);
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;