const express = require("express");
const router = express.Router();

// Get controller for api route
const { validateLogin } = require("../../controllers/account/validate-login");

// Setup api route
router.post('/validate-login', validateLogin);
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;