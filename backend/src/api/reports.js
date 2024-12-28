const { Router } = require('express');
const reportController = require('../controllers/reports.controller.js');
const { validate } = require('../middlewares.js');
const { uploadFile } = require('../config/cloudinary.config.js');

const router = Router();

router.get('/', reportController.getAllReports);
router.get('/:reportId', reportController.getReportsById);
router.get('/admin/statistic', reportController.getStatistic);
router.post('/', uploadFile.single('bukti'), validate('/create'), reportController.createReports);
router.patch('/:reportId', uploadFile.single('bukti'), validate('/update'), reportController.updateReports);
router.delete('/:reportId', reportController.deleteReport);

module.exports = router;
