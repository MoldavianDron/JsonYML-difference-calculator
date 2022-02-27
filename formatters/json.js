import _ from 'lodash';

const json = (AST) => JSON.stringify(_.cloneDeep(AST));

export default json;
