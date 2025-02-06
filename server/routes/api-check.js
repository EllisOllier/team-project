const express = require("express");
const router = express.Router();

// import controllers
const {getApiCheck} = require('../controllers/api-check')

// import middlewares

// api routes
router.get('/api-check', getApiCheck);

module.exports = router;
