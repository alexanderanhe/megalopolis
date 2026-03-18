import { Router } from 'express';
import { getToday } from '../controllers/hoyNoCircula.controller';

const router = Router();

router.get('/hoy-no-circula/today', getToday);

export default router;
