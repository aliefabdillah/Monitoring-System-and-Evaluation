const express = require('express');
const reports = require('./reports.js');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/reports', reports);

module.exports = router;
