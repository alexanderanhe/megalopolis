const ApiError = require('../utils/apiError');
const env = require('../config/env');

const errorHandler = (err, req, res, next) => {
  const isApiError = err instanceof ApiError;
  const statusCode = isApiError ? err.statusCode : 500;
  const errorCode = isApiError ? err.errorCode : 'INTERNAL_ERROR';
  const message = isApiError ? err.message : 'Unexpected error';

  const payload = {
    success: false,
    message,
    error: errorCode
  };

  if (env.nodeEnv === 'production') {
    res.status(statusCode).json(payload);
    return;
  }

  payload.stack = err.stack;
  res.status(statusCode).json(payload);
};

module.exports = errorHandler;
