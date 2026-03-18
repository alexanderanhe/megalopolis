import { Router } from 'express';
import { getHome } from '../controllers/dashboard.controller';

const router = Router();

router.get('/dashboard/home', getHome);

export default router;
