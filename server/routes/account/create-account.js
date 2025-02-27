const express = require("express");
const router = express.Router();

const { createAccount } = require("../../controllers/account/create-account");

router.post('/create-account', createAccount);
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;