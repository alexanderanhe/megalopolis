import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import { getManifest, listManifests } from '../services/manifest.service';

const listManifestsController = asyncHandler(async (req: Request, res: Response) => {
  const items = await listManifests();
  res.json({
    success: true,
    data: items
  });
});

const getManifestController = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const manifest = await getManifest(slug);
  if (manifest.format === 'json') {
    res.json(manifest.data);
    return;
  }
  res.type('text/yaml').send(manifest.data);
});

export { listManifestsController as listManifests, getManifestController as getManifest };
