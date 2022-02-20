import parse from './src/parsers.js';
import diffAST from './src/diffAST.js';
import formatAST from './src/formatAST.js';

const genDiff = (pathToFile1, pathToFile2) => {
  const obj1 = parse(pathToFile1);
  const obj2 = parse(pathToFile2);
  const AST = diffAST(obj1, obj2);
  const formatted = formatAST(AST);
  return formatted;
};

export default genDiff;
