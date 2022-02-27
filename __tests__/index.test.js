import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('two structured jsons test', () => {
  const file1Path = getFixturePath('file1_structured.json');
  const file2Path = getFixturePath('file2_structured.json');
  const expectedResult = fs.readFileSync(getFixturePath('expected_result_structured.txt'), 'utf-8');
  const result = genDiff(file1Path, file2Path);
  expect(result).toEqual(expectedResult);
});

test('two structured yaml test', () => {
  const file1Path = getFixturePath('file1_structured.yaml');
  const file2Path = getFixturePath('file2_structured.yml');
  const expectedResult = fs.readFileSync(getFixturePath('expected_result_structured.txt'), 'utf-8');
  const result = genDiff(file1Path, file2Path);
  expect(result).toEqual(expectedResult);
});

test('two structured files with combined extensions (.json, .yml)', () => {
  const file1Path = getFixturePath('file1_structured.json');
  const file2Path = getFixturePath('file2_structured.yml');
  const expectedResult = fs.readFileSync(getFixturePath('expected_result_structured.txt'), 'utf-8');
  const result = genDiff(file1Path, file2Path);
  expect(result).toEqual(expectedResult);
});

test('two structured files with combined extensions (.yaml, .json)', () => {
  const file1Path = getFixturePath('file1_structured.yaml');
  const file2Path = getFixturePath('file2_structured.json');
  const expectedResult = fs.readFileSync(getFixturePath('expected_result_structured.txt'), 'utf-8');
  const result = genDiff(file1Path, file2Path);
  expect(result).toEqual(expectedResult);
});

test('two strcutured jsons plain format', () => {
  const file1Path = getFixturePath('file1_structured.yaml');
  const file2Path = getFixturePath('file2_structured.json');
  const expectedResult = fs.readFileSync(getFixturePath('expected_result_plain.txt'), 'utf-8');
  const result = genDiff(file1Path, file2Path, 'plain');
  expect(result).toEqual(expectedResult);
});

test('invalid file path', () => {
  const file1Path = 'musor';
  const file2Path = getFixturePath('file2.yml');
  expect(() => genDiff(file1Path, file2Path)).toThrow();
});
