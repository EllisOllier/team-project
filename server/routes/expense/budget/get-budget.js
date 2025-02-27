const express = require("express");
const router = express.Router();

const { getBudget } = require("../../../controllers/expense/budget/get-budget");

router.get('/get-budget', getBudget);
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;