import { Router } from 'express';
import {
  getManifest,
  getManifestJson,
  getManifestYaml,
  listManifests,
  listManifestsJson,
  listManifestsYaml
} from '../controllers/manifest.controller';

const router = Router();

router.get('/integrations/manifests', listManifests);
router.get('/integrations/manifests.json', listManifestsJson);
router.get('/integrations/manifests.yaml', listManifestsYaml);
router.get('/integrations/manifests/:slug.json', getManifestJson);
router.get('/integrations/manifests/:slug.yaml', getManifestYaml);
router.get('/integrations/manifests/:slug', getManifest);

export default router;
