import _ from '@/utils';
import { checkTypeErrorWithWarning } from '@/helper/logTipsHelper';

export function checkStyleType(style) {
  if (_.isUndef(style) || _.isNull(style)) {
    style = {};
  }

  if (!_.isObject(style)) {
    checkTypeErrorWithWarning('style', 'Object, null or undefined', style);
    return;
  }

  return style;
}

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
  if (value === null || _.isUndef(value)) {
    return true;
  }

  return false;
}

/**
 * @param {string} name
 * @param {boolean} allowDefault
 * @return {.PropertyInfo} PropertyInfo
 */
export function getStyleInfo(name = '', allowDefault = true) {
  return (
    styles[name] || (allowDefault ? new PropertyInfo(name, _.transformUpperWithHyphen(name)) : null)
  );
}

const styles = {};

class PropertyInfo {
  /**
   * @param {string} name
   * @param {string} propertyName
   * @param {number} type
   */
  constructor(name, propertyName, type) {
    this.name = name;
    this.propertyName = propertyName;
    this.type = type;
  }
}
