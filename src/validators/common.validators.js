const { z } = require('zod');

const citySchema = z.string().min(1).max(50).transform((val) => val.trim().toLowerCase());

module.exports = { citySchema };
