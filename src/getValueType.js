import _ from 'lodash';

const getValueType = (value) => {
  if (_.isObject(value)) {
    return 'nested';
  }
  return 'simple';
};

export default getValueType;
