const { Router } = require('express');
const reportController = require('../controllers/reports.controller.js');

const router = Router();

router.get('/', reportController.getAllReports);

module.exports = router;
