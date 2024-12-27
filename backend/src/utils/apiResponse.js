/* eslint-disable max-classes-per-file */
class ApiSuccess {
  constructor(statusCode, message, data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

class ApiError extends Error {
  constructor(statusCode, message, stack) {
    super(message);
    this.statusCode = statusCode;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

module.exports = {
  ApiSuccess,
  ApiError,
};
