import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import ApiError from '../utils/apiError';
import {
  getManifest,
  getManifestBySlug,
  getManifestRegistry,
  getManifestRegistryYaml,
  listManifests
} from '../services/manifest.service';

const listManifestsController = asyncHandler(async (req: Request, res: Response) => {
  try {
    const items = await listManifests();
    res.json(items);
  } catch (err) {
    if (err instanceof ApiError) {
      res.status(500).send('Manifest registry unavailable');
      return;
    }
    throw err;
  }
});

const notFound = (res: Response) => {
  res.status(404).send('Not Found');
};

const listManifestsJson = asyncHandler(async (req: Request, res: Response) => {
  try {
    const registry = await getManifestRegistry();
    res.json(registry);
  } catch (err) {
    if (err instanceof ApiError) {
      res.status(500).send('Manifest registry unavailable');
      return;
    }
    throw err;
  }
});

const listManifestsYaml = asyncHandler(async (req: Request, res: Response) => {
  try {
    const registryYaml = await getManifestRegistryYaml();
    res.type('text/yaml').send(registryYaml);
  } catch (err) {
    if (err instanceof ApiError) {
      res.status(500).send('Manifest registry unavailable');
      return;
    }
    throw err;
  }
});

const getManifestYaml = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const manifest = await getManifestBySlug(slug);
    res.type('text/yaml').send(manifest.yaml);
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 404) {
      notFound(res);
      return;
    }
    throw err;
  }
});

const getManifestJson = asyncHandler(async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const manifest = await getManifestBySlug(slug);
    res.json(manifest.json);
  } catch (err) {
    if (err instanceof ApiError && err.statusCode === 404) {
      notFound(res);
      return;
    }
    throw err;
  }
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

export {
  listManifestsController as listManifests,
  listManifestsJson,
  listManifestsYaml,
  getManifestYaml,
  getManifestJson,
  getManifestController as getManifest
};
