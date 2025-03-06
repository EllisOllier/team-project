const express = require("express");
const router = express.Router();

// Get controller for api route
const { createAccount } = require("../../controllers/account/create-account");

// Setup api route
router.post('/create-account', createAccount);
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;