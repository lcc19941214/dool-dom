import _ from '../utils';

let rootIndex = 1;

const KEY = '$key';

export const getDefaultKey = () => (rootIndex++).toString();

export const getKey = node => node && node[KEY];

export const setKey = (node, key) => {
  if (_.isString(key) || _.isNumber(key)) {
    node[KEY] = key.toString().trim() || undefined;
  }
};
