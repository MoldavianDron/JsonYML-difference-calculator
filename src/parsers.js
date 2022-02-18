import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';

const parse = (filePath) => {
  const configPath = path.resolve(process.cwd(), filePath);
  const format = path.extname(configPath);
  const data = fs.readFileSync(configPath, 'utf-8');
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  }

  if (format === '.json') {
    return JSON.parse(data);
  }

  return new Error('File extension must be .json or .yml');
};

export default parse;
