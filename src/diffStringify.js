import _ from 'lodash';

const diffStringify = (obj1, obj2, mergedObj, sep = ' ', repeats = 1) => {
  const iter = (curValue, depth) => {
    if (!_.isObject(curValue)) {
      return `${curValue}`;
    }

    const flagDiff = (key, curIndent) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (obj1[key] === obj2[key]) {
          return `${curIndent}   ${key}: ${obj1[key]}`;
        }
        return [`${curIndent} - ${key}: ${obj1[key]}`, `${curIndent} + ${key}: ${obj2[key]}`];
      }

      if (!_.has(obj1, key)) {
        return `${curIndent} + ${key}: ${obj2[key]}`;
      }

      return `${curIndent} - ${key}: ${obj1[key]}`;
    };

    const mergedObjKeys = Object.keys(curValue).sort();
    const indentSize = repeats * depth;
    const indent = sep.repeat(indentSize);
    const closeBracketIndent = sep.repeat(indentSize - repeats);
    const lines = mergedObjKeys.flatMap((key) => flagDiff(key, indent));
    return [
      '{',
      ...lines,
      `${closeBracketIndent}}`,
    ].join('\n');
  };

  return iter(mergedObj, 1);
};

export default diffStringify;
