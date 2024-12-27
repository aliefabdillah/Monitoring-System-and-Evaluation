const express = require('express');
const reports = require('./reports.js');

const router = express.Router();

router.use('/reports', reports);

module.exports = router;
