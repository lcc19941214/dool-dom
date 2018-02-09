import _ from '@/utils';
import { isElement } from '../element';
import { setKeyForNode, composeKey, getElementKeyTree, getDOMElementKeyTree } from './key';
import { setValueForProperty, setValueForInlineStyle } from './property';
import { addEventHandlerForProps } from './eventHandler';
import { typeError } from '@/helper/logTipsHelper';

/**
 * render Element instance to real DOM node, and attach it
 * to given DOMNode
 *
 * @param {*} element
 * @param {HTMLElement} mountPoint
 * @return {HTMLElement}
 */
export function render(element, mountPoint) {
  const elem = createDOM(element);
  const root = _.isElement(mountPoint) ? mountPoint : undefined;
  if (root) {
    root.appendChild(elem);
    return elem;
  } else {
    throw new TypeError(typeError('mountPoint', 'an instance of HTMLElement', mountPoint));
  }
}

/**
 * render Element instance to real DOM node.
 * this method receives params of any types and transform them
 * to HTMLElement or Comment
 *
 * @param {*} element
 * @param {string|number} defaultKey
 * @return {HTMLElement}
 */
export function createDOM(element, defaultKey) {
  if (isElement(element)) {
    return createElement(element, defaultKey);
  }

  if (_.isArray(element)) {
    return createDocumentFragment(element, defaultKey);
  }

  if (_.isString(element) || _.isNumber(element)) {
    return createTextNode(element, defaultKey);
  }

  if (_.isObject(element)) {
    throw new TypeError(
      typeError(
        'element',
        'String, Number, Array, undefined, null or an instance of Element',
        element
      )
    );
  }

  if (_.isUndef(element) || _.isBoolean(element)) {
    return createEmptyNode();
  }

  if (_.isNull(element)) {
    return createEmptyNode();
  }

  return createUnknownNode();
}

function createElement(element = {}, defaultKey) {
  const { tagName = '', props = {}, key = defaultKey } = element;
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

    // set key
    setKeyForNode(elem, key);

    // set props
    Object.keys(props).forEach(name => {
      setValueForProperty(elem, name, props[name]);
    });

    // set style
    setValueForInlineStyle(elem, props['style']);

    // add event listeners
    addEventHandlerForProps(elem, props);

    // render children
    children.forEach((child, idx) => {
      const key = idx + 1;
      const childEl = createDOM(child, key);
      if (childEl) elem.appendChild(childEl);
    });
  } catch (error) {
    console.error(error);
  }
  return elem;
}

function createDocumentFragment(child, indexKey) {
  const elem = document.createDocumentFragment();
  child.forEach((subChild, idx) => {
    const key = idx + 1;
    const subElem = createDOM(subChild, composeKey(indexKey, key));
    if (subElem) elem.appendChild(subElem);
  });
  return elem;
}

function createTextNode(text, key) {
  const node = document.createTextNode(text);
  setKeyForNode(node, key);
  return node;
}

function createEmptyNode() {
  return document.createComment(' empty node ');
}

function createUnknownNode() {
  return document.createComment(' unknown node ');
}

const RenderDOM = {
  render,
  createDOM
};

if (_DEV_) {
  Object.assign(RenderDOM, {
    getElementKeyTree,
    getDOMElementKeyTree,
    createElement,
    createDocumentFragment,
    createTextNode,
    createEmptyNode,
    createUnknownNode
  });
}

export default RenderDOM;
