const typeCheck = {
  isString: str => typeof str === 'string',

  isNumber: num => typeof num === 'number',

  isArray: arr => {
    if (Array.isArray) {
      return Array.isArray(arr);
    } else {
      return arr instanceof Array;
    }
  },

  isFunc: fn => typeof fn === 'function',

  isNull: val => val === null,

  isUndef: val => val === undefined,

  isObject: obj => !typeCheck.isNull(obj) && typeof obj === 'object',

  isEmptyObject: obj => {
    if (Object.hasOwnProperty('keys')) {
      return Object.keys(obj).length === 0;
    } else {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
  },

  isNode: node => {
    return typeCheck.isObject(Node)
      ? node instanceof Node
      : !!(node && typeCheck.isObject(node) && typeCheck.isNumber(node.nodeType) && typeCheck.isString(node.nodeName));
  },

  isElement: elem => {
    return typeCheck.isObject(HTMLElement)
      ? elem instanceof HTMLElement
      : !!(elem && typeCheck.isObject(elem) && elem.nodeType === 1 && typeCheck.isString(elem.nodeName));
  }
};

export default typeCheck;
