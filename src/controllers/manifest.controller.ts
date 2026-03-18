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
  res.json({
    success: true,
    data: manifest
  });
});

export { listManifestsController as listManifests, getManifestController as getManifest };
