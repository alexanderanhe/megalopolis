import { Router } from 'express';
import healthRoutes from './health.routes';
import hoyNoCirculaRoutes from './hoyNoCircula.routes';
import weatherRoutes from './weather.routes';
import dashboardRoutes from './dashboard.routes';

const router = Router();

router.use(healthRoutes);
router.use(hoyNoCirculaRoutes);
router.use(weatherRoutes);
router.use(dashboardRoutes);

export default router;
