const { z } = require('zod');
const { citySchema } = require('./common.validators');

const weatherQuerySchema = z.object({
  city: citySchema
});

module.exports = { weatherQuerySchema };
