import _ from 'lodash';

const getPlainValue = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const plain = (AST) => {
  const makePlain = (node, prevProperty) => {
    const currentProperty = `${prevProperty}${node.name}`;
    if (node.type === 'nested') {
      return [...node.children
        .filter((child) => child.type !== 'unchanged')
        .map((child) => makePlain(child, `${currentProperty}.`)),
      ].join('\n');
    }
    if (node.type === 'deleted') {
      return `Property '${currentProperty}' was removed`;
    }

    if (node.type === 'updated') {
      const [valueBefore, valueAfter] = node.value;
      return `Property '${currentProperty}' was updated. From ${getPlainValue(valueBefore)} to ${getPlainValue(valueAfter)}`;
    }

    return `Property '${currentProperty}' was added with value: ${getPlainValue(node.value)}`;
  };
  return [...AST
    .filter((node) => node.type !== 'unchanged')
    .map((node) => makePlain(node, '')),
  ].join('\n');
};

export default plain;
