const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, 'dist');

const ensureDir = (dirPath) => {
  fs.mkdirSync(dirPath, { recursive: true });
};

const copyDir = (srcDir, destDir) => {
  if (fs.existsSync(srcDir) === false) return;
  ensureDir(destDir);
  fs.cpSync(srcDir, destDir, { recursive: true });
};

const copyFile = (srcFile, destFile) => {
  if (fs.existsSync(srcFile) === false) return;
  ensureDir(path.dirname(destFile));
  fs.copyFileSync(srcFile, destFile);
};

copyDir(
  path.join(projectRoot, 'src', 'integrations', 'manifests'),
  path.join(distRoot, 'integrations', 'manifests')
);

copyFile(
  path.join(projectRoot, 'src', 'integrations', 'manifest-registry.yaml'),
  path.join(distRoot, 'integrations', 'manifest-registry.yaml')
);

copyFile(
  path.join(projectRoot, 'docs', 'openapi.yaml'),
  path.join(distRoot, 'docs', 'openapi.yaml')
);

copyFile(
  path.join(projectRoot, 'docs', 'api-routes.yaml'),
  path.join(distRoot, 'docs', 'api-routes.yaml')
);
