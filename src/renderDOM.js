import utils from './utils';
import Element from './element';
// import Property from './property';
import { checkTypeError } from './helper/logTipsHelper';

/**
 * render Element instance to real DOM node, and attach it
 * to given DOMNode
 *
 * @param {String|Number|Array|undefined|null|{DoolElement: Element}} element
 * @param {DOMElement} mountPoint
 * @return {DOMElement}
 */
export function render(element, mountPoint) {
  const elem = createDOM(element);
  const DOMElement = utils.isElement(mountPoint) ? mountPoint : document.body;
  if (elem) DOMElement.appendChild(elem);
  return elem;
}

/**
 * render Element instance to real DOM node.
 * this method receives params of any types and transform them
 * to DOMElement or Comment
 *
 * @param {String|Number|Array|undefined|null|{DoolElement: Element}} element
 * @return {DOMElement}
 */
export function createDOM(element) {
  let elem;
  if (element instanceof Element) {
    elem = createElement(element);
  } else {
    elem = createElementWithTypeCheck(element);
  }
  return elem;
}

function createElement(element = {}) {
  const { tagName = '', props = {} } = element;
  const children = element.children || [];
  let elem;
  try {
    if (tagName === 'script') {
      // Create the script via .innerHTML so its "parser-inserted" flag is
      // set to true and it does not execute
      const div = document.createElement('div');
      div.innerHTML = '<script><' + '/script>';
      elem = div.removeChild(div.firstChild);
    } else {
      elem = document.createElement(tagName);
    }

    // Property.set(elem, props);

    Object.keys(props).forEach(name => {
      const value = props[name];
      elem.setAttribute(name, value);
    });

    children.forEach(child => {
      const childEl = createDOM(child);
      if (childEl) elem.appendChild(childEl);
    });
  } catch (error) {
    console.log(error);
    elem = createUnknownNode();
  }
  return elem;
}

function createElementWithTypeCheck(element) {
  let elem;
  if (utils.isArray(element)) {
    elem = createDocumentFragment(element);
  } else if (utils.isString(element) || (!Number.isNaN(element) && utils.isNumber(element))) {
    elem = createTextNode(element);
  } else if (utils.isNull(element) || utils.isUndef(element)) {
    elem = createEmptyNode();
  } else if (utils.isObject(element)) {
    checkTypeError('element', 'String, Number, Array, undefined, null or an instance of Element', element);
    elem = createUnknownNode();
  } else {
    elem = createUnknownNode();
  }
  return elem;
}

function createDocumentFragment(child) {
  const elem = document.createDocumentFragment();
  child.forEach(subChild => {
    const subElem = createDOM(subChild);
    if (subElem) elem.appendChild(subElem);
  });
  return elem;
}

function createTextNode(text) {
  return document.createTextNode(text);
}

function createEmptyNode() {
  return document.createComment('empty node');
}

function createUnknownNode() {
  return document.createComment('unknown node');
}

const RenderDOM = {
  render,
  createDOM
};

export default RenderDOM;
