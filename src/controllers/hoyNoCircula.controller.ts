import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { getToday } from '../services/hoyNoCircula.service';
import { buildHncComputed, resolveWidgetStatus } from '../utils/hoyNoCircula';

const getTodayController = asyncHandler(async (req: Request, res: Response) => {
  const result = await getToday();
  const computed = buildHncComputed(result.data);
  const widgetStatus = resolveWidgetStatus(result.data);
  res.json({
    success: true,
    updatedAt: result.updatedAt,
    data: result.data,
    computed,
    widgetStatus
  });
});

export { getTodayController as getToday };
