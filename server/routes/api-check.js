const express = require("express");
const router = express.Router();

// Get controller for api route
const { getApiCheck } = require('../controllers/api-check')

// Setup api route
router.get('/api-check', getApiCheck);
router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = router;
