import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { getHome } from '../services/dashboard.service';

const getHomeController = asyncHandler(async (req: Request, res: Response) => {
  const result = await getHome();
  res.json({
    success: true,
    updatedAt: result.updatedAt,
    data: result.data
  });
});

export { getHomeController as getHome };
