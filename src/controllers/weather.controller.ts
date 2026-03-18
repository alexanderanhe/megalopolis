import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/apiError';
import { getCurrent } from '../services/weather.service';
import { weatherQuerySchema } from '../validators/weather.validators';

const getCurrentController = asyncHandler(async (req: Request, res: Response) => {
  const parsed = weatherQuerySchema.safeParse(req.query);
  if (parsed.success === false) {
    throw new ApiError('Invalid query parameters', 400, 'VALIDATION_ERROR');
  }

  const { city } = parsed.data;
  const result = await getCurrent(city);

  res.json({
    success: true,
    updatedAt: result.updatedAt,
    data: result.data
  });
});

export { getCurrentController as getCurrent };
