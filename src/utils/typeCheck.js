const TYPES = {};

'Boolean Number String Function Array Date RegExp Object Symbol Map Set'
  .split(' ')
  .forEach(item => {
    TYPES[`[object ${item}]`] = item.toLowerCase();
  });

function type(obj) {
  return obj == null ? String(obj) : TYPES[Object.prototype.toString.call(obj)] || 'object';
}

const typeCheck = {
  isString: obj => type(obj) === 'string',

  isNumber: obj => !isNaN(parseFloat(obj)) && isFinite(obj),

  isBoolean: obj => type(obj) === 'boolean',

  isFunction: obj => type(obj) === 'function',

  isFunc: obj => typeCheck.isFunction(obj),

  isArray: obj => type(obj) === 'array',

  isObject: obj => type(obj) === 'object',

  isRegExp: obj => type(obj) === 'regexp',

  isDate: obj => type(obj) === 'date',

  isNull: obj => type(obj) === 'null',

  isUndef: obj => type(obj) === 'undefined',

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
      : !!(
          node &&
          typeCheck.isObject(node) &&
          typeCheck.isNumber(node.nodeType) &&
          typeCheck.isString(node.nodeName)
        );
  },

  isElement: elem => {
    return typeCheck.isObject(HTMLElement)
      ? elem instanceof HTMLElement
      : !!(
          elem &&
          typeCheck.isObject(elem) &&
          elem.nodeType === 1 &&
          typeCheck.isString(elem.nodeName)
        );
  }
};

export default typeCheck;
