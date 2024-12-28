const Joi = require('joi');

const createReport = Joi.object({
  nama_program: Joi.string().required(),
  jml_penerima: Joi.number().min(0).required(),
  wilayah: Joi.string().required(),
  tgl_penyaluran: Joi.date().required(),
  catatan: Joi.string().allow(null).allow(''),
  bukti: Joi.object({
    mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/jpg', 'application/pdf').required(),
    size: Joi.number().max(2 * 1024 * 1024).required(),
  }),
  status: Joi.string().required(),
});

const updateReport = Joi.object({
  nama_program: Joi.string(),
  jml_penerima: Joi.number().min(0),
  wilayah: Joi.string(),
  tgl_penyaluran: Joi.date(),
  catatan: Joi.string().allow(null).allow(''),
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
