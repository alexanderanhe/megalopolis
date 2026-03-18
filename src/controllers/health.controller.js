const asyncHandler = require('../utils/asyncHandler');

const getHealth = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    message: 'API is running'
  });
});

module.exports = { getHealth };
