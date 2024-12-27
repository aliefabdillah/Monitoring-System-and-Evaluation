const { Router } = require('express');
const reportController = require('../controllers/reports.controller.js');

const router = Router();

router.get('/', reportController.getAllReports);
router.post('/', reportController.createReports);
router.patch('/:reportId', reportController.updateReports);
router.delete('/:reportId', reportController.deleteReport);

module.exports = router;
