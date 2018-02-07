import typeCheck from './typeCheck';

const tools = {
  createFrozenObject: val => {
    const obj = { ...val };
    Object.freeze(obj);
    return obj;
  },

  /**
   * flatten given array with specific level
   * @param {array} - array
   * @param {number|boolean} - [level=1] when level is true, means flatten iteratively
   * @example
   * flatten([1, [2, [3]]]) => [1, 2, [3]]
   * flatten([1, [2, [3]]], true) => [1, 2, 3]
   */
  flatten: (array, level = 1) => {
    let deep = 0;

    if (typeCheck.isBoolean(level)) {
      level = level || 1;
    } else if (!typeCheck.isNumber(level) || level < 0) {
      level = 1;
    }

    function _flatten(array, deep) {
      if (!typeCheck.isArray(array)) return array;
      const rst = [];

      if (level !== true && deep === level) {
        return [array];
      }

      array.forEach(x => {
        if (typeCheck.isArray(x)) {
          x.forEach(y => rst.push(...[].concat(_flatten(y, deep + 1))));
        } else {
          rst.push(x);
        }
      });

      return rst;
    }

    return _flatten(array, deep);
  }
};

export default tools;
