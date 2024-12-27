const reportService = require('../services/reports.service.js');

async function getAllReports(req, res, next) {
  try {
    const reportResult = await reportService.getAll();
    res.status(reportResult.statusCode).send(reportResult);
  } catch (error) {
    next(error);
  }
}

async function createReports(req, res, next) {
  try {
    const reportResult = await reportService.create(req.body);
    res.status(reportResult.statusCode).send(reportResult);
  } catch (error) {
    next(error);
  }
}

async function updateReports(req, res, next) {
  try {
    const reportResult = await reportService.update(req.body, req.params.reportId);
    res.status(reportResult.statusCode).send(reportResult);
  } catch (error) {
    next(error);
  }
}

async function deleteReport(req, res, next) {
  try {
    const reportResult = await reportService.remove(req.params.reportId);
    res.status(reportResult.statusCode).send(reportResult);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllReports,
  createReports,
  updateReports,
  deleteReport,
};
