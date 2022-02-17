import _ from 'lodash';
import path from 'path';
import process from 'process';
import fs from 'fs';
import diffStringify from './src/diffStringify.js';

const areValid = (path1, path2) => {
  const validFormats = ['json', 'yml'];
  const fileName1 = _.last(path1.split('/'));
  const fileName2 = _.last(path2.split('/'));
  const format1 = _.last(fileName1.split('.'));
  const format2 = _.last(fileName2.split('.'));
  return (validFormats.includes(format1) && validFormats.includes(format2));
};

const genDiff = (pathToFile1, pathToFile2) => {
  if (!areValid(pathToFile1, pathToFile2)) {
    return new Error('File extension must be .json or .yml');
  }

  const fullPath1 = path.resolve(process.cwd(), pathToFile1);
  const fullPath2 = path.resolve(process.cwd(), pathToFile2);

  const obj1 = JSON.parse(fs.readFileSync(fullPath1, 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(fullPath2, 'utf-8'));
  const mergedObj = { ...obj1, ...obj2 };

  return diffStringify(obj1, obj2, mergedObj);
};

export default genDiff;
