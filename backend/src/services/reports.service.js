/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
const { status } = require('http-status');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const PDFDocument = require('pdfkit');
const db = require('../models/index.js');
const { ApiError, ApiSuccess } = require('../utils/apiResponse.js');
const fetchWilayahName = require('../utils/fetchWilayahName.js');

async function getAll() {
  const reportsData = await db.Report.findAll({
    attributes: ['id', 'nama_program', 'jml_penerima', 'provinsi', 'kabupaten_kota', 'kecamatan', 'status'],
    order: [
      ['createdAt', 'desc'],
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
      status: 'Pending',
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

async function exportToExcel() {
  try {
    const reports = await db.Report.findAll();

    const exportDir = '/tmp/exports';

    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const resolvedReports = await Promise.all(
      reports.map(async (report) => ({
        Nama_Program: report.nama_program,
        Jumlah_Penerima: report.jml_penerima,
        Provinsi: await fetchWilayahName(report.provinsi, 'province'),
        Kabupaten_Kota: await fetchWilayahName(report.kabupaten_kota, 'regency'),
        Kecamatan: await fetchWilayahName(report.kecamatan, 'district'),
        Tanggal_Penyaluran: report.tgl_penyaluran,
        Bukti: report.bukti,
        Alasan: report.alasan,
        Catatan: report.catatan,
        Status: report.status,
      })),
    );

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(resolvedReports);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reports');

    const filePath = path.join(exportDir, 'reports.xlsx');
    XLSX.writeFile(workbook, filePath);

    return new ApiSuccess(status.OK, 'EXPORT SUCCESS', { filePath, fileName: 'reports.xlsx' });
  } catch (error) {
    console.error(error);
    throw new ApiError(status.INTERNAL_SERVER_ERROR, error.message);
  }
}

async function exportToPDF() {
  try {
    const reports = await db.Report.findAll(); // Ambil data laporan dari database

    const exportDir = '/tmp/exports';

    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir, { recursive: true });
    }

    const doc = new PDFDocument();
    const filePath = path.join(exportDir, 'reports.pdf');
    const writableStream = fs.createWriteStream(filePath);

    doc.pipe(writableStream);
    doc.fontSize(16).text('Laporan Bantuan', { align: 'center' });
    doc.moveDown();

    const resolvedReports = await Promise.all(
      reports.map(async (report) => {
        const provinsi = await fetchWilayahName(report.provinsi, 'province');
        const kabupatenKota = await fetchWilayahName(report.kabupaten_kota, 'regency');
        const kecamatan = await fetchWilayahName(report.kecamatan, 'district');

        return {
          Nama_Program: report.nama_program,
          Jumlah_Penerima: report.jml_penerima,
          Provinsi: provinsi,
          Kabupaten_Kota: kabupatenKota,
          Kecamatan: kecamatan,
          Tanggal_Penyaluran: report.tgl_penyaluran,
          Bukti: report.bukti,
          Alasan: report.alasan,
          Catatan: report.catatan,
          Status: report.status,
        };
      }),
    );

    resolvedReports.forEach((report, index) => {
      doc.fontSize(12).text(`No: ${index + 1}`);
      doc.text(`Nama Program: ${report.Nama_Program}`);
      doc.text(`Jumlah Penerima: ${report.Jumlah_Penerima}`);
      doc.text(`Wilayah: ${report.Provinsi}, ${report.Kabupaten_Kota}, ${report.Kecamatan}`);
      doc.text(`Tanggal Penyaluran: ${report.Tanggal_Penyaluran}`);
      doc.text(`Bukti: ${report.Bukti}`);
      doc.text(`Catatan: ${report.Catatan}`);
      doc.text(`Alasan: ${report.Alasan}`);
      doc.text(`Status: ${report.Status}`);
      doc.moveDown();
    });

    doc.end();

    await new Promise((resolve, reject) => {
      writableStream.on('finish', resolve);
      writableStream.on('error', reject);
    });

    return new ApiSuccess(status.OK, 'EXPORT SUCCESS', { filePath, fileName: 'reports.pdf' });
  } catch (error) {
    console.error(error);
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
  exportToExcel,
  exportToPDF,
};
