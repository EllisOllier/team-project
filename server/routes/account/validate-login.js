const express = require("express");
const router = express.Router();

const { validateLogin } = require("../../controllers/account/validate-login");

router.post('/validate-login', validateLogin);
router.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

module.exports = router;