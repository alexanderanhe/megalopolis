const asyncHandler = require('../utils/asyncHandler');
const dashboardService = require('../services/dashboard.service');

const getHome = asyncHandler(async (req, res) => {
  const result = await dashboardService.getHome();
  res.json({
    success: true,
    updatedAt: result.updatedAt,
    data: result.data
  });
});

module.exports = { getHome };
