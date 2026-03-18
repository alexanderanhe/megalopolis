import { Router } from 'express';
import { getManifest, listManifests } from '../controllers/manifest.controller';

const router = Router();

router.get('/integrations/manifests', listManifests);
router.get('/integrations/manifests/:slug', getManifest);

export default router;
