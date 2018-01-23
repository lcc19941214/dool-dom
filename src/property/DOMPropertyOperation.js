import {
  BOOLEAN,
  DIFFERENT_NAME_PROPS_MAP,
  getPropertyInfo,
  shouldIgnoreProperty,
  shouldSetValueForPropertyWithWarning
} from './DOMProperty';
import { shouldIgnoreStyle, getStyleInfo } from './CSSStyle';

/**
 * @param {DOMElement} elem
 * @param {String} name
 * @param {*} value
 */
export function setValueForProperty(elem, name, value) {
  const propertyInfo = getPropertyInfo(name);

  if (!propertyInfo) return;

  if (shouldIgnoreProperty(name, value, propertyInfo)) return;

  const { propertyName, type, useProperty } = propertyInfo;

  if (!_DEV_) {
    if (shouldSetValueForPropertyWithWarning(name, value, propertyInfo)) {
      console.warn('%s is not deprecated, use %s instead', name, DIFFERENT_NAME_PROPS_MAP[name]);
    }
  }

  if (useProperty) {
    elem[propertyName] = value;
  } else {
    if (type === BOOLEAN) {
      value = '';
    } else {
      // `setAttribute` with objects becomes only `[object]` in IE8/9,
      // ('' + value) makes it output the correct toString()-value.
      value = '' + value;
    }
    elem.setAttribute(propertyName, value);
  }
}

export function setValueForInlineStyle(elem, style = {}) {
  let styleStr = '';
  Object.keys(style).forEach(name => {
    const value = style[name];
    const propertyInfo = getStyleInfo(name);

    if (!propertyInfo) return;
    if (shouldIgnoreStyle(name, value, propertyInfo)) return;

    const { propertyName } = propertyInfo;
    styleStr += `${propertyName}: ${value}; `;
  });
  if (styleStr) {
    elem.setAttribute('style', styleStr.trim());
  }
}
