import _ from 'lodash';

const getValueType = (value) => {
  if (_.isObject(value)) {
    return 'nested';
  }
  return 'simple';
};

const diffAST = (object1, object2) => {
  const makeNodes = (obj1, obj2) => {
    const makeNode = (key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
          return {
            key, keyType: 'nested', value: makeNodes(obj1[key], obj2[key]), valueType: 'children',
          };
        }
        if (obj1[key] !== obj2[key]) {
          return [
            {
              key, keyType: 'changed before', value: obj1[key], valueType: getValueType(obj1[key]),
            },
            {
              key, keyType: 'changed after', value: obj2[key], valueType: getValueType(obj2[key]),
            },
          ].flat();
        }
        return {
          key, keyType: 'unchanged', value: obj1[key], valueType: getValueType(obj1[key]),
        };
      }
      if (!_.has(obj1, key)) {
        return {
          key, keyType: 'added', value: obj2[key], valueType: getValueType(obj2[key]),
        };
      }
      return {
        key, keyType: 'deleted', value: obj1[key], valueType: getValueType(obj1[key]),
      };
    };
    const mergedObj = { ...obj1, ...obj2 };
    const mergedObjKeys = Object.keys(mergedObj).sort();
    const nodes = mergedObjKeys.flatMap((key) => makeNode(key));
    return nodes;
  };

  return {
    key: null, keyType: 'unchanged', value: makeNodes(object1, object2), valueType: 'children',
  };
};
export default diffAST;
export { getValueType };
