import _ from 'lodash';

const getFormat = (nodeType = 'unchanged') => {
  if (nodeType === 'deleted') return '  - ';
  if (nodeType === 'added') return '  + ';
  return '    ';
};

const stylish = (AST, sep = ' ', repeats = 4) => {
  const stringify = (value, depth) => {
    if (!_.isObject(value)) {
      return `${value}`;
    }
    const indentNumber = repeats * (depth - 1);
    const indent = sep.repeat(indentNumber);

    return [
      '{',
      ...Object.keys(value).map((key) => `${indent}${getFormat()}${key}: ${stringify(value[key], depth + 1)}`),
      `${indent}}`,
    ].join('\n');
  };

  const makeStylish = (node, depth) => {
    const indentNumber = repeats * (depth - 1);
    const indent = sep.repeat(indentNumber);
    if (node.type !== 'nested' && node.type !== 'updated') {
      return `${indent}${getFormat(node.type)}${node.name}: ${stringify(node.value, depth + 1)}`;
    }
    if (node.type === 'updated') {
      const [valueBeforUpdate, valueAfterUpdate] = node.value;
      return [
        `${indent}${getFormat('deleted')}${node.name}: ${stringify(valueBeforUpdate, depth + 1)}`,
        `${indent}${getFormat('added')}${node.name}: ${stringify(valueAfterUpdate, depth + 1)}`,
      ].join('\n');
    }

    return [
      `${indent}${getFormat(node.type)}${node.name}: {`,
      ...node.children.map((child) => makeStylish(child, depth + 1)),
      `${indent}${sep.repeat(repeats)}}`,
    ].join('\n');
  };

  return [
    '{',
    ...AST.map((node) => makeStylish(node, 1)),
    '}',
  ].join('\n');
};

export default stylish;
