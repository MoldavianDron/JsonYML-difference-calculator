import getValueType from '../src/getValueType.js';

const getFormat = (keyType) => {
  if (keyType === 'nested' || keyType === 'unchanged') {
    return '   ';
  }
  if (keyType === 'changed before' || keyType === 'deleted') {
    return ' - ';
  }
  return ' + ';
};

const makeNodeFromKey = (key, value) => ({
  key, keyType: 'unchanged', value, valueType: getValueType(value),
});

const stylishAST = (AST, sep = ' ', spacesCount = 1) => {
  const iter = (nodeValue, depth, valueType) => {
    const indentSize = depth * spacesCount;
    const indent = sep.repeat(indentSize);
    const additionalIndent = ('   ').repeat(indentSize - 1);
    const closedBracketIndent = sep.repeat(indentSize - 1);
    if (valueType === 'simple') {
      return `${nodeValue}`;
    }
    const children = valueType === 'nested' ? (
      Object.keys(nodeValue).map((keyEl) => makeNodeFromKey(keyEl, nodeValue[keyEl]))
    ) : nodeValue;
    const lines = children.flatMap((child) => `${indent}${additionalIndent}${getFormat(child.keyType)}${child.key}: ${iter(child.value, depth + 1, child.valueType)}`);
    return [
      '{',
      ...lines,
      `${closedBracketIndent}${additionalIndent}}`,
    ].join('\n');
  };

  return iter(AST.value, 1, AST.valueType);
};

export default stylishAST;
