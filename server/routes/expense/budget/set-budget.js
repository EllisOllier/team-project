const express = require("express");
const router = express.Router();

// Get controller for api route
const { setBudget } = require('../../../controllers/expense/budget/set-budget');

// Setup api route
router.post('/set-budget', setBudget);
router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = router;