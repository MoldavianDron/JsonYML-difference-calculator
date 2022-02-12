/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable quote-props */

import _ from 'lodash';
import path from 'path';
import process from 'process';
import fs from 'fs';

const areValid = (path1, path2) => {
  const validFormats = ['json', 'yml'];
  const fileName1 = _.last(path1.split('/'));
  const fileName2 = _.last(path2.split('/'));
  const format1 = _.last(fileName1.split('.'));
  const format2 = _.last(fileName2.split('.'));
  return (format1 === format2 && validFormats.includes(format1));
};

const diffStringify = (obj1, obj2, flagedObject, sep = ' ', repeats = 1) => {
  const iter = (curValue, depth) => {
    if (!_.isObject(curValue)) {
      return `${curValue}`;
    }
    const flagDiff = (key, flag, curIndent) => {
      switch (flag) {
      case 'deleted':
        return `${curIndent} - ${key}: ${obj1[key]}`;
      case 'unchanged':
        return `${curIndent}   ${key}: ${obj1[key]}`;
      case 'added':
        return `${curIndent} + ${key}: ${obj2[key]}`;
      default:
        return [
          `${curIndent} - ${key}: ${obj1[key]}`,
          `${curIndent} + ${key}: ${obj2[key]}`
        ];
      }
    }
    const indentSize = repeats * depth;
    const indent = sep.repeat(indentSize);
    const closeBracketIndent = sep.repeat(indentSize - repeats);
    const lines = Object
      .entries(curValue)
      .flatMap(([key, flag]) => flagDiff(key, flag, indent));
    return [
      '{',
      ...lines,
      `${closeBracketIndent}}`,
    ].join('\n');
  };

  return iter(flagedObject, 1);
};

const genDiff = (pathToFile1, pathToFile2) => {
  if (!areValid(pathToFile1, pathToFile2)) {
    return new Error('Both files must have .json or .yml extensions')
  }

  const fullPath1 = path.resolve(process.cwd(), pathToFile1);
  const fullPath2 = path.resolve(process.cwd(), pathToFile2);

  const obj1 = JSON.parse(fs.readFileSync(fullPath1));
  const obj2 = JSON.parse(fs.readFileSync(fullPath2));
  const mergedObj = { ...obj1, ...obj2 };

  const allSortedKeys = Object.keys(mergedObj).sort();
  const flagedObject = allSortedKeys.reduce(
    (acc, key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        acc[key] = obj1[key] === obj2[key] ? 'unchanged' : 'changed';
      }
      if (!_.has(obj1, key)) {
        acc[key] = 'added';
      }

      if (!_.has(obj2, key)) {
        acc[key] = 'deleted'
      }
      return acc;
    },
    {}
  )
  
  return diffStringify(obj1, obj2, flagedObject, ' ', 1);
};

export default genDiff;