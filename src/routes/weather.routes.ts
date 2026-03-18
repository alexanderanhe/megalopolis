import { Router } from 'express';
import { getCurrent } from '../controllers/weather.controller';

const router = Router();

router.get('/weather/current', getCurrent);

export default router;
