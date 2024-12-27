// eslint-disable-next-line import/no-unresolved
const { status } = require('http-status');
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

module.exports = {
  getAll,
};
