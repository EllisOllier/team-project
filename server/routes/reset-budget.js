const express = require("express");
const router = express.Router();

const { resetBudget } = require("../controllers/reset-budget");

router.get('/reset-budget', resetBudget);
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;