import _ from '../utils';
import Element from '../element';

export const KEY = '$DOOL_KEY';

export const getKey = node => node && node[KEY];

export const setKey = (node, key) => {
  if (checkKey(key)) {
    Object.defineProperty(node, KEY, {
      value: key.toString()
    });
  }
};

export const checkKey = key => (_.isString(key) && key && key.trim()) || _.isNumber(key);

export const composeKey = (...args) => args.filter(v => v).join('/');

export const checkAndAssignChildrenKey = (children, ...prefix) => {
  if (!_.isArray(children)) return;

  children.forEach((child, idx) => {
    if (_.isArray(child)) {
      checkAndAssignChildrenKey(child, idx + 1);
      return;
    }

    if (child instanceof Element) {
      // if key of element is undefined, set key to index as default value
      // if element is one of an array, must set key with prefix
      if (_.isUndef(child.key)) {
        const key = idx + 1;
        child.key = prefix.length ? composeKey(...prefix, key) : key;

        // if children has already checked element child, just skip it
        if (child.$childrenKeyChecked) return;
        if (child.children && child.children.length) {
          checkAndAssignChildrenKey(child.children);
        }
      }
    }
  });
};

/**
 * deeply iterate given root and print key of all elements
 */
export const getElementKeyTree = (root, log = true) => {
  if (_DEV_) {
    let str = '';
    const print = (elem, indent) => {
      const { key, children = [] } = elem;
      log && console.log(indent + key);
      str += `${indent + key}\n`;
      children.length && walkChildren(children, indent);
    };

    const walkChildren = (children, indent) => {
      children.forEach(child => {
        if (child instanceof Element) {
          print(child, indent + '  ');
        } else if (_.isArray(child)) {
          walkChildren(child, indent);
        }
      });
    };

    print(root, '');
    return str;
  }
};

/**
 * deeply iterate given root and print key of all DOM Element
 */
export const getDOMElementKeyTree = (root, log = true) => {
  if (_DEV_) {
    let str = '';
    const print = (elem, indent) => {
      const { [KEY]: key } = elem;
      log && console.log(indent + key);
      str += `${indent + key}\n`;
      const children = [...elem.children];
      children.length &&
        children.forEach(child => {
          print(child, indent + '  ');
        });
    };

    print(root, '');
    return str;
  }
};
