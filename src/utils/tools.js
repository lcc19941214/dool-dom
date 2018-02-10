import typeCheck from './typeCheck';
import _ from 'lodash';

const tools = {
  createFrozenObject: val => {
    const obj = { ...val };
    Object.freeze(obj);
    return obj;
  },

  /**
   * flatten given array with specific level
   * @param {array} array
   * @param {number|boolean} [level=1] when level is true, means flatten iteratively
   * @example
   * flatten([1, [2, [3]]]) => [1, 2, [3]]
   * flatten([1, [2, [3]]], true) => [1, 2, 3]
   */
  flatten: (array, level = 1) => {
    let deep = -1;

    if (typeCheck.isBoolean(level)) {
      level = level || 1;
    } else if (!typeCheck.isNumber(level) || level < 0) {
      level = 1;
    }

    function _flatten(array, deep) {
      if (level !== true && deep === level) {
        return [array];
      }

      if (!typeCheck.isArray(array)) return array;
      let rst = [];

      array.forEach(x => {
        if (typeCheck.isArray(x)) {
          rst = rst.concat(_flatten(x, deep + 1));
        } else {
          rst.push(x);
        }
      });

      return rst;
    }

    return _flatten(array, deep);
  },

  /**
   * @returns {string}
   * @example
   * yqd5omib22d
   */
  createHash: () => {
    return Math.random()
      .toString(36)
      .slice(2);
  },

  set: (...args) => _.set(...args),

  get: (...args) => _.get(...args)
};

window.flatten = tools.flatten;

export default tools;
