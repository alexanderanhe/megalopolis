import { Router } from 'express';
import healthRoutes from './health.routes';
import hoyNoCirculaRoutes from './hoyNoCircula.routes';
import weatherRoutes from './weather.routes';
import dashboardRoutes from './dashboard.routes';
import manifestRoutes from './manifest.routes';

const router = Router();

router.use(healthRoutes);
router.use(hoyNoCirculaRoutes);
router.use(weatherRoutes);
router.use(dashboardRoutes);
router.use(manifestRoutes);

export default router;
