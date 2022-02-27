import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const getFormatter = (format) => {
  if (format === 'stylish') {
    return stylish;
  }
  if (format === 'plain') {
    return plain;
  }
  return json;
};

export default getFormatter;
