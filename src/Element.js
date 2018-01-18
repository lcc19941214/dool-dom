import { renderDOM } from './RenderDOM';

export default class Element {
  static createElement(...args) {
    return new Element(...args);
  }

  static render = element => renderDOM(element);

  constructor(tagName, props, ...children) {
    this.tagName = tagName;
    this.props = props || {};
    this.children = children;
  }

  render() {
    return Element.render(this);
  }
}
