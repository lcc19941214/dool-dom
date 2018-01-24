import utils from '../utils';

export function shouldIgnoreStyle(name, value) {
  switch (typeof value) {
    case 'function':
    case 'symbol':
    case 'object':
      return true;
    default:
  }

  return false;
}

// eslint-disable-next-line no-unused-vars
export function shouldRemoveStyle(name = '', value, propertyInfo) {
  if (value === null || utils.isUndef(value)) {
    return true;
  }

  return false;
}

/**
 * @param {String} name
 * @param {Boolean} allowDefault
 * @return {PropertyInfo} PropertyInfo
 */
export function getStyleInfo(name = '', allowDefault = true) {
  return (
    styles[name] ||
    (allowDefault ? new PropertyInfo(name, utils.transformUpperWithHyphen(name)) : null)
  );
}

const styles = {};

class PropertyInfo {
  /**
   * @param {String} name
   * @param {String} propertyName
   * @param {Number} type
   */
  constructor(name, propertyName, type) {
    this.name = name;
    this.propertyName = propertyName;
    this.type = type;
  }
}
