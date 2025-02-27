const express = require("express");
const router = express.Router();

// import controllers
const { setBudget } = require('../../../controllers/expense/budget/set-budget');


// api routes
router.post('/set-budget', setBudget);
router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = router;