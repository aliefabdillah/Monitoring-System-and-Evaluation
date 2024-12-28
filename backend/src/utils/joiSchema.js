const Joi = require('joi');

const createReport = Joi.object({
  nama_program: Joi.string().required(),
  jml_penerima: Joi.number().min(0).required(),
  provinsi: Joi.string().required(),
  kabupaten_kota: Joi.string().required(),
  kecamatan: Joi.string().required(),
  tgl_penyaluran: Joi.date().required(),
  catatan: Joi.string().allow(null).allow(''),
  alasan: Joi.string().allow(null).allow(''),
  bukti: Joi.object({
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg', 'application/pdf').required(),
    size: Joi.number().max(2 * 1024 * 1024).required(),
  }),
});

const updateReport = Joi.object({
  nama_program: Joi.string(),
  jml_penerima: Joi.number().min(0),
  provinsi: Joi.string(),
  kabupaten_kota: Joi.string(),
  kecamatan: Joi.string(),
  tgl_penyaluran: Joi.date(),
  catatan: Joi.string().allow(null).allow(''),
  alasan: Joi.string().allow(null).allow(''),
  bukti: Joi.object({
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg', 'application/pdf'),
    size: Joi.number().max(2 * 1024 * 1024),
  }),
  status: Joi.string(),
});

module.exports = {
  '/create': createReport,
  '/update': updateReport,
};
