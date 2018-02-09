import _ from '@/utils';
import {
  BOOLEAN,
  DIFFERENT_NAME_PROPS_MAP,
  getPropertyInfo,
  shouldIgnoreProperty,
  shouldRemoveProperty,
  shouldSetValueForPropertyWithWarning
} from './DOMProperty';
import { checkStyleType, shouldIgnoreStyle, shouldRemoveStyle, getStyleInfo } from './CSSStyle';

/**
 * @param {DOMElement} elem
 * @param {string} name
 * @param {*} value
 */
export function setValueForProperty(elem, name, value) {
  const propertyInfo = getPropertyInfo(name);

  if (!propertyInfo) return;

  if (shouldIgnoreProperty(name, value, propertyInfo)) return;
  if (shouldRemoveProperty(name, value, propertyInfo)) value = null;

  const { propertyName, type, useProperty } = propertyInfo;

  if (!_DEV_) {
    if (shouldSetValueForPropertyWithWarning(name, value, propertyInfo)) {
      console.warn('%s is not deprecated, use %s instead', name, DIFFERENT_NAME_PROPS_MAP[name]);
    }
  }

  // properties
  if (useProperty) {
    if (value === null) {
      elem[propertyName] = false;
    } else {
      elem[propertyName] = value;
    }
    return;
  }

  // attributes
  if (value === null) {
    elem.removeAttribute(propertyName);
  } else {
    if (type === BOOLEAN) {
      value = '';
    } else {
      value = '' + value;
    }

    elem.setAttribute(propertyName, value);
  }
}

export function setValueForInlineStyle(elem, style) {
  style = checkStyleType(style, elem);
  if (!style) return;

  let styleStr = '';
  Object.keys(style).forEach(name => {
    let value = style[name];
    const propertyInfo = getStyleInfo(name);

    if (!propertyInfo) return;
    if (shouldIgnoreStyle(name, value, propertyInfo)) return;
    if (shouldRemoveStyle(name, value, propertyInfo)) {
      elem.style[name] = null;
      return;
    }

    const { propertyName } = propertyInfo;
    styleStr += `${propertyName}: ${value}; `;
  });
  if (styleStr) {
    elem.setAttribute('style', styleStr.trim());
  }
}
