import _ from '../../utils';

// propertyInfo type
// reserved properties that will be ignored when set property value
export const RESERVED = 0;

// normal ones
export const ATTR = 1;

// this type works for HTML properties which comes info effect with only
// property name, despite the value is true, false or any other values
export const BOOLEAN = 2;

const EVENT_HANDLER_PROP = /^on([A-Z][a-z]+)+$/g;

export const DIFFERENT_NAME_PROPS = [
  ['acceptCharset', 'accept-charset'],
  ['className', 'class'],
  ['htmlFor', 'for'],
  ['httpEquiv', 'http-equiv']
];
const DIFFERENT_NAME_PROPS_MAP = {};
DIFFERENT_NAME_PROPS.forEach(([prefer, deprecated]) => {
  DIFFERENT_NAME_PROPS_MAP[deprecated] = prefer;
});
export { DIFFERENT_NAME_PROPS_MAP };

export function shouldIgnoreProperty(name = '', value, propertyInfo) {
  if (propertyInfo) {
    if (propertyInfo.type === RESERVED) {
      return true;
    }
  }

  // event handler
  if (name.length > 2 && EVENT_HANDLER_PROP.test(name)) {
    return true;
  }

  return false;
}

// eslint-disable-next-line no-unused-vars
export function shouldRemoveProperty(name = '', value, propertyInfo) {
  if (value === null || _.isUndef(value)) {
    return true;
  }

  return false;
}

export function shouldSetValueForPropertyWithWarning(name) {
  return DIFFERENT_NAME_PROPS.some(group => group[1] === name);
}

/**
 * @param {string} name
 * @param {boolean} allowDefault - as Dool does not contains all the HTML properties
 *  like react does, use this param to make a default property info
 *  @see https://github.com/facebook/react/blob/master/packages/react-dom/src/shared/DOMProperty.js#L147
 * @return {PropertyInfo} PropertyInfo
 */
export function getPropertyInfo(name = '', allowDefault = true) {
  return (
    properties[name] ||
    (allowDefault ? new PropertyInfo(name, name.toLowerCase(), ATTR, false) : null)
  );
}

const properties = {};

class PropertyInfo {
  /**
   * @param {string} name
   * @param {string} propertyName
   * @param {number} type
   * @param {boolean} useProperty
   */
  constructor(name, propertyName, type, useProperty) {
    this.name = name;
    this.propertyName = propertyName;
    this.type = type;
    this.useProperty = useProperty;
  }
}

// reserved properties
['style', 'key'].forEach(name => {
  properties[name] = new PropertyInfo(name, name, RESERVED, false);
});

// properties may have different name
DIFFERENT_NAME_PROPS.forEach(([name, propertyName]) => {
  properties[name] = new PropertyInfo(name, propertyName, ATTR, false);
});

// properties must use DOM property instead of attribute
[
'checked',
'multiple',
'muted',
'selected'
].forEach(name => {
  properties[name] = new PropertyInfo(name, name, BOOLEAN, true);
});

// properties are HTML boolean attributes.
[
  'allowFullScreen',
  'async',
  'autoFocus',
  'autoPlay',
  'controls',
  'default',
  'defer',
  'disabled',
  'formNoValidate',
  'hidden',
  'loop',
  'noModule',
  'noValidate',
  'open',
  'playsInline',
  'readOnly',
  'required',
  'reversed',
  'scoped',
  'seamless',
  'itemScope'
].forEach(name => {
  properties[name] = new PropertyInfo(name, name.toLowerCase(), BOOLEAN, false);
});
