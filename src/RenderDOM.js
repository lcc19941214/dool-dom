import utils from '../utils';
import Element from './Element';

export default class RenderDOM {
  /**
   * render Element instance to real DOM node, and attach it
   * to given DOMNode
   * @param {[Element]} element
   * @param {[HTMLElement]} DOMNode
   */
  static render(element, DOMNode) {
    const elem = RenderDOM.renderDOM(element);
    const DOMElement = utils.isElement(DOMNode) ? DOMNode : document.body;
    DOMElement.appendChild(elem);
    return elem;
  }

  /**
   * render Element instance to real DOM node.
   * this method receives params of any types and transform them
   * to HTMLElement or Comment
   * @param {[Element, string, number, array, undefined]} element
   */
  static renderDOM(element) {
    let elem;
    if (element instanceof Element) {
      elem = RenderDOM.renderElement(element);
    } else {
      elem = RenderDOM.renderWithTypeCheck(element);
    }
    return elem;
  }

  static renderElement(element = {}) {
    const { tagName, props, children } = element;
    let elem;
    try {
      elem = document.createElement(tagName);
      Object.keys(props).forEach(name => {
        const value = props[name];
        elem.setAttribute(name, value);
      });

      children.forEach(child => {
        const childEl = RenderDOM.renderDOM(child);
        elem.appendChild(childEl);
      });
    } catch (error) {
      elem = RenderDOM.renderUnknownNode();
    }
    return elem;
  }

  static renderWithTypeCheck(element) {
    let elem;
    if (utils.isArray(element)) {
      elem = RenderDOM.renderArray(element);
    } else if (utils.isString(element) || (!Number.isNaN(element) && utils.isNumber(element))) {
      elem = document.createTextNode(element);
    } else if (utils.isNull(element) || utils.isUndef(element)) {
      elem = RenderDOM.renderEmptyNode();
    } else if (utils.isObject(element)) {
      elem = RenderDOM.renderObject();
    } else {
      elem = RenderDOM.renderUnknownNode();
    }
    return elem;
  }

  static renderObject() {
    console.warn('child is supposed to be undefined, null, string, array or Element instance, but got an object');
    return RenderDOM.renderUnknownNode();
  }

  static renderArray(child) {
    const elem = document.createDocumentFragment();
    child.forEach(subChild => {
      const subElem = RenderDOM.renderDOM(subChild);
      elem.appendChild(subElem);
    });
    return elem;
  }

  static renderEmptyNode() {
    return document.createComment('empty node');
  }

  static renderUnknownNode() {
    return document.createComment('unknown node');
  }
}
