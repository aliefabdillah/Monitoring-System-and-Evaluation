/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const { status } = require('http-status');
const { v4: uuidv4 } = require('uuid');
const db = require('../models/index.js');
const { ApiError, ApiSuccess } = require('../utils/apiResponse.js');

async function getAll() {
  const reportsData = await db.Report.findAll({
    order: [
      ['createdAt', 'asc'],
    ],
  });

  if (!reportsData) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, 'GET REPORTS FAILED');
  }

  return new ApiSuccess(status.OK, 'GET REPORTS SUCCESS', reportsData);
}

async function create(body) {
  try {
    const createdReports = await db.Report.create({
      id: uuidv4(),
      ...body,
    });
    return new ApiSuccess(status.CREATED, 'CREATE BOOK SUCCESS', createdReports);
  } catch (error) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, error.message);
  }
}

async function update(body, reportId) {
  try {
    const updatedReport = await db.Report.findByPk(reportId);

    Object.assign(updatedReport, body);
    await updatedReport.save();

    return new ApiSuccess(status.OK, 'UPDATE REPORT SUCCESS', updatedReport);
  } catch (error) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, error.message);
  }
}

async function remove(reportId) {
  try {
    await db.Report.destroy({ where: { id: reportId } });

    return new ApiSuccess(status.OK, 'DELETE REPORT SUCCESS');
  } catch (error) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, error.message);
  }
}

module.exports = {
  getAll,
  create,
  update,
  remove,
};
