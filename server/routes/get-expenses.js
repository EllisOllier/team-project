const express = require("express");
const router = express.Router();

const { getExpenses } = require("../controllers/get-expenses");

router.get('/get-expenses', getExpenses);
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;