import fs from 'fs/promises';
import path from 'path';
import ApiError from '../utils/apiError';
import { parseYamlFile } from '../utils/yaml';

const manifestsDir = path.join(__dirname, '../integrations/manifests');

const isValidSlug = (slug: string) => {
  if (slug.length === 0) return false;
  for (const c of slug) {
    const isLower = c >= 'a' && c <= 'z';
    const isDigit = c >= '0' && c <= '9';
    const isDash = c === '-';
    if (isLower === false && isDigit === false && isDash === false) return false;
  }
  return true;
};

const isInsideDir = (dir: string, filePath: string) => {
  const resolvedDir = path.resolve(dir);
  const resolvedFile = path.resolve(filePath);
  return resolvedFile.startsWith(resolvedDir + path.sep);
};

const listManifests = async () => {
  const files = await fs
    .readdir(manifestsDir)
    .catch((err) => {
      if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
        throw new ApiError(
          'Manifests directory not found. Ensure assets are copied to dist.',
          500,
          'MANIFESTS_UNAVAILABLE'
        );
      }
      throw err;
    });
  const yamlFiles = files.filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'));

  return yamlFiles.map((file) => {
    const slug = file.replace(/\.(yaml|yml)$/i, '');
    return { slug, file };
  });
};

const getManifest = async (slug: string) => {
  if (isValidSlug(slug) === false) {
    throw new ApiError('Manifest not found', 404, 'MANIFEST_NOT_FOUND');
  }

  const yamlPath = path.join(manifestsDir, slug + '.yaml');
  const ymlPath = path.join(manifestsDir, slug + '.yml');

  const candidate = await fs
    .access(yamlPath)
    .then(() => yamlPath)
    .catch(async () => {
      await fs.access(ymlPath);
      return ymlPath;
    })
    .catch(() => {
      throw new ApiError('Manifest not found', 404, 'MANIFEST_NOT_FOUND');
    });

  if (isInsideDir(manifestsDir, candidate) === false) {
    throw new ApiError('Manifest not found', 404, 'MANIFEST_NOT_FOUND');
  }

  return parseYamlFile(candidate);
};

export { listManifests, getManifest };
