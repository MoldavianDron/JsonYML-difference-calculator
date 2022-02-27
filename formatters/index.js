import stylish from './stylish.js';

const getFormatter = (format) => {
  if (format === 'stylish') {
    return stylish;
  }
  return 'fix me';
};

export default getFormatter;
