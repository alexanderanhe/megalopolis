const ApiError = require('../utils/apiError');

const notFound = (req, res, next) => {
  next(new ApiError('Route not found', 404, 'NOT_FOUND'));
};

module.exports = notFound;
