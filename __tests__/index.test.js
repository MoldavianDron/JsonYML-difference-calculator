import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('two plain jsons test', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const expectedResult = fs.readFileSync(getFixturePath('expected_result'), 'utf-8');
  const result = genDiff(file1Path, file2Path);
  expect(result).toEqual(expectedResult);
});
