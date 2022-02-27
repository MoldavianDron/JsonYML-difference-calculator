import _ from 'lodash';

const diff = (fileObj1, fileObj2) => {
  const makeNode = (key) => {
    if (_.has(fileObj1, key) && _.has(fileObj2, key)) {
      if (_.isObject(fileObj1[key]) && _.isObject(fileObj2[key])) {
        return { name: key, type: 'nested', children: diff(fileObj1[key], fileObj2[key]) };
      }
      if (fileObj1[key] === fileObj2[key]) return { name: key, type: 'unchanged', value: fileObj1[key] };
      return { name: key, type: 'updated', value: [fileObj1[key], fileObj2[key]] };
    }
    if (_.has(fileObj1, key)) return { name: key, type: 'deleted', value: fileObj1[key] };
    return { name: key, type: 'added', value: fileObj2[key] };
  };
  const keys = Object.keys({ ...fileObj1, ...fileObj2 }).sort();
  return keys.map((key) => makeNode(key));
};

export default diff;
