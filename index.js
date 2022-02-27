import getFormatter from './formatters/index.js';
import parse from './src/parsers.js';
import diff from './src/diff.js';

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const obj1 = parse(pathToFile1);
  const obj2 = parse(pathToFile2);
  const AST = diff(obj1, obj2);
  const formatter = getFormatter(format);
  const formatted = formatter(AST);
  return formatted;
};

genDiff('__fixtures__/file1_structured.json', '__fixtures__/file2_structured.json', 'json');

export default genDiff;
