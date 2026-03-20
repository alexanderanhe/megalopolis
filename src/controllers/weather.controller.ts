import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/apiError';
import { getCurrent } from '../services/weather.service';
import { buildWeatherComputed } from '../utils/weather';
import { weatherQuerySchema } from '../validators/weather.validators';

const getCurrentController = asyncHandler(async (req: Request, res: Response) => {
  const parsed = weatherQuerySchema.safeParse(req.query);
  if (parsed.success === false) {
    throw new ApiError('Invalid query parameters', 400, 'VALIDATION_ERROR');
  }

  const { city } = parsed.data;
  const result = await getCurrent(city);
  const computed = buildWeatherComputed(result.data);

  res.json({
    success: true,
    updatedAt: result.updatedAt,
    data: result.data,
    computed
  });
});

export { getCurrentController as getCurrent };
