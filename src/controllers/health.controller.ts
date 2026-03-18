import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';

const getHealth = asyncHandler(async (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'API is running'
  });
});

export { getHealth };
