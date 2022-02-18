import parse from './src/parsers.js';
import diffStringify from './src/diffStringify.js';

const genDiff = (pathToFile1, pathToFile2) => {
  const obj1 = parse(pathToFile1);
  const obj2 = parse(pathToFile2);
  const mergedObj = { ...obj1, ...obj2 };

  return diffStringify(obj1, obj2, mergedObj);
};

export default genDiff;
