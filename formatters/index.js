import stylishAST from './stylish.js';

const getFormatter = (format) => {
  if (format === 'stylish') {
    return stylishAST;
  }
  return 'fix me';
};

export default getFormatter;
