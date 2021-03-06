const chore = {
  /**
   * @example backgroundColor => background-color
   */
  transformUpperWithHyphen: (str = '') =>
    str.replace(/[A-Z]/g, (...arg) => `-${arg[0].toLowerCase()}`),
  /**
   * @example background-color => backgroundColor
   */
  transformHyphenWithUpper: (str = '') =>
    str.replace(/-[a-z]/g, (...arg) => arg[0].slice(1).toUpperCase())
};

export default chore;
