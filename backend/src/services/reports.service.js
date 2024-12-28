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

async function getById(reportId) {
  try {
    const reportsData = await db.Report.findByPk(reportId);

    if (!reportsData) {
      throw new ApiError(status.NOT_FOUND, `Report with name ${reportId} not found`);
    }

    return new ApiSuccess(status.OK, 'GET REPORT SUCCES', reportsData);
  } catch (error) {
    throw new ApiError(error.statusCode || status.INTERNAL_SERVER_ERROR, error.message);
  }
}

async function create(body, file) {
  try {
    const fileUrl = file.path;

    const createdReports = await db.Report.create({
      id: uuidv4(),
      bukti: fileUrl,
      ...body,
    });
    return new ApiSuccess(status.CREATED, 'CREATE BOOK SUCCESS', createdReports);
  } catch (error) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, error.message);
  }
}

async function update(req, reportId) {
  try {
    const { file, body } = req;
    const updatedReport = await db.Report.findByPk(reportId);

    if (!updatedReport) {
      throw new ApiError(status.NOT_FOUND, `Report with name ${reportId} not found`);
    }

    let fileUrl = updatedReport.bukti;
    if (file) {
      fileUrl = file.path;
      // update file
      updatedReport.bukti = fileUrl;
    }

    Object.assign(updatedReport, body);
    await updatedReport.save();

    return new ApiSuccess(status.OK, 'UPDATE REPORT SUCCESS', updatedReport);
  } catch (error) {
    throw new ApiError(error.statusCode || status.INTERNAL_SERVER_ERROR, error.message);
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

async function statistic() {
  try {
    const totalReports = await db.Report.count();

    const recipientsPerProgram = await db.Report.findAll({
      attributes: ['nama_program', [db.Sequelize.fn('SUM', db.Sequelize.col('jml_penerima')), 'total_penerima']],
      group: ['nama_program'],
    });

    const distributionByProvince = await db.Report.findAll({
      attributes: ['provinsi', [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'jumlah_laporan']],
      group: ['provinsi'],
    });

    return new ApiSuccess(status.OK, 'GET STATISTIC SUCCESS', { totalReports, recipientsPerProgram, distributionByProvince });
  } catch (error) {
    throw new ApiError(status.INTERNAL_SERVER_ERROR, error.message);
  }
}

module.exports = {
  getAll,
  create,
  update,
  remove,
  statistic,
  getById,
};
