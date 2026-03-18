import fs from 'fs/promises';
import YAML from 'yaml';

const parseYamlFile = async (filePath: string) => {
  const content = await fs.readFile(filePath, 'utf8');
  return YAML.parse(content);
};

export { parseYamlFile };
