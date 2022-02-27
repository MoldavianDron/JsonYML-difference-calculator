import plain from './plain.js';
import stylish from './stylish.js';

const getFormatter = (format) => {
  if (format === 'stylish') {
    return stylish;
  }
  if (format === 'plain') {
    return plain;
  }
  return 'fix me';
};

export default getFormatter;
