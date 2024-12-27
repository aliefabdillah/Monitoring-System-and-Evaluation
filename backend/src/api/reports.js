const { Router } = require('express');
const reportController = require('../controllers/reports.controller.js');

const router = Router();

router.get('/', reportController.getAllReports);
router.post('/', reportController.createReports);
router.patch('/:reportId', reportController.updateReports);

module.exports = router;
