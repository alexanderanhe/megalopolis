import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { getToday } from '../services/hoyNoCircula.service';

const getTodayController = asyncHandler(async (req: Request, res: Response) => {
  const result = await getToday();
  res.json({
    success: true,
    updatedAt: result.updatedAt,
    data: result.data
  });
});

export { getTodayController as getToday };
