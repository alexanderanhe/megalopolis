const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const weatherService = require('../services/weather.service');
const { weatherQuerySchema } = require('../validators/weather.validators');

const getCurrent = asyncHandler(async (req, res) => {
  const parsed = weatherQuerySchema.safeParse(req.query);
  if (parsed.success === false) {
    throw new ApiError('Invalid query parameters', 400, 'VALIDATION_ERROR');
  }

  const { city } = parsed.data;
  const result = await weatherService.getCurrent(city);

  res.json({
    success: true,
    updatedAt: result.updatedAt,
    data: result.data
  });
});

module.exports = { getCurrent };
