const asyncHandler = require('../utils/asyncHandler');
const hoyNoCirculaService = require('../services/hoyNoCircula.service');

const getToday = asyncHandler(async (req, res) => {
  const result = await hoyNoCirculaService.getToday();
  res.json({
    success: true,
    updatedAt: result.updatedAt,
    data: result.data
  });
});

module.exports = { getToday };
