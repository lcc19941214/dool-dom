import RenderDOM from './renderDOM';

const { createDOM } = RenderDOM;

export default class Element {
  static createElement(...args) {
    return new Element(...args);
  }

  static render = createDOM;

  constructor(tagName, props, ...children) {
    this.tagName = tagName;
    this.props = props || {};
    this.children = children;
  }

  render() {
    return Element.render(this);
  }
}
