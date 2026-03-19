import fs from 'fs/promises';
import path from 'path';
import ApiError from '../utils/apiError';
import { parseYamlFile } from '../utils/yaml';
import env from '../config/env';

const manifestsDir = path.join(__dirname, '../integrations/manifests');
const registryPath = path.join(__dirname, '../integrations/manifest-registry.yaml');

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

const parseSlug = (slug: string) => {
  if (slug.endsWith('.json')) {
    return { format: 'json' as const, baseSlug: slug.slice(0, -5) };
  }
  if (slug.endsWith('.yaml')) {
    return { format: 'yaml' as const, baseSlug: slug.slice(0, -5) };
  }
  if (slug.endsWith('.yml')) {
    return { format: 'yaml' as const, baseSlug: slug.slice(0, -4) };
  }
  return { format: 'yaml' as const, baseSlug: slug };
};

const isInsideDir = (dir: string, filePath: string) => {
  const resolvedDir = path.resolve(dir);
  const resolvedFile = path.resolve(filePath);
  return resolvedFile.startsWith(resolvedDir + path.sep);
};

const replacePlaceholders = (value: unknown): unknown => {
  const placeholder = '${API_BASE_URL}';
  if (typeof value === 'string') {
    return value.split(placeholder).join(env.apiBaseUrl);
  }
  if (Array.isArray(value)) {
    return value.map((item) => replacePlaceholders(item));
  }
  if (value && typeof value === 'object') {
    const output: Record<string, unknown> = {};
    for (const [key, item] of Object.entries(value)) {
      output[key] = replacePlaceholders(item);
    }
    return output;
  }
  return value;
};

const resolveManifestPath = async (baseSlug: string) => {
  const yamlPath = path.join(manifestsDir, baseSlug + '.yaml');
  const ymlPath = path.join(manifestsDir, baseSlug + '.yml');

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

  return candidate;
};

const getManifestRegistry = async () => {
  const registry = await parseYamlFile(registryPath).catch((err) => {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
      throw new ApiError(
        'Manifest registry not found. Ensure assets are copied to dist.',
        500,
        'MANIFESTS_UNAVAILABLE'
      );
    }
    throw err;
  });
  if (Array.isArray(registry) === false) {
    throw new ApiError('Manifest registry is invalid.', 500, 'MANIFESTS_UNAVAILABLE');
  }
  return registry as Array<Record<string, unknown>>;
};

const listManifests = async () => {
  const registry = await getManifestRegistry();
  return registry;
};

const getManifestRegistryYaml = async () => {
  const yaml = await fs.readFile(registryPath, 'utf8').catch((err) => {
    if (err && typeof err === 'object' && 'code' in err && err.code === 'ENOENT') {
      throw new ApiError(
        'Manifest registry not found. Ensure assets are copied to dist.',
        500,
        'MANIFESTS_UNAVAILABLE'
      );
    }
    throw err;
  });
  return yaml;
};

const getManifestBySlug = async (baseSlug: string) => {
  if (isValidSlug(baseSlug) === false) {
    throw new ApiError('Manifest not found', 404, 'MANIFEST_NOT_FOUND');
  }

  const candidate = await resolveManifestPath(baseSlug);
  const json = await parseYamlFile(candidate);
  const resolvedJson = replacePlaceholders(json);
  const yaml = await fs.readFile(candidate, 'utf8');
  const resolvedYaml = yaml.split('${API_BASE_URL}').join(env.apiBaseUrl);

  return { json: resolvedJson, yaml: resolvedYaml } as const;
};

const getManifest = async (slug: string) => {
  const { format, baseSlug } = parseSlug(slug);
  const manifest = await getManifestBySlug(baseSlug);
  return { format, data: format === 'json' ? manifest.json : manifest.yaml } as const;
};

export {
  listManifests,
  getManifest,
  getManifestBySlug,
  getManifestRegistry,
  getManifestRegistryYaml
};
