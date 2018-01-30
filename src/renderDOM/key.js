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

export const composeKey = (parentKey = '', key = '', delimiter = '.') => {
  return [parentKey.toString(), key.toString()].filter(v => v).join(delimiter);
};

export const decorateArrayElementKey = (key, decorator = '/') => `${decorator}${key}`;
