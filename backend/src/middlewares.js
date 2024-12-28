// eslint-disable-next-line import/no-unresolved
const { status } = require('http-status');
const joiSchema = require('./utils/joiSchema.js');
const { deleteFile } = require('./config/cloudinary.config.js');

function notFound(req, res, next) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const { statusCode = status.INTERNAL_SERVER_ERROR, message } = err;

  res.status(statusCode);
  res.json({
    message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

const validate = (path) => async (req, res, next) => {
  const validationOptions = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: false,
  };

  const schema = joiSchema[path];
  const { error, value } = schema.validate(req.body, validationOptions);

  if (error) {
    const response = {
      statusCode: status.BAD_REQUEST,
      error: {
        original: error._original,
        details: error.details.map((data, type) => ({
          message: data.message.replace(/['"\\]/g, ''),
          type,
        })),
      },
    };

    const { file } = req;
    if (file && file.filename) {
      await deleteFile(file.filename);
    }

    return res.status(response.statusCode).send(response);
  }

  req.body = value;
  return next();
};

module.exports = {
  notFound,
  errorHandler,
  validate,
};
