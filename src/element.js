import RenderDOM from './renderDOM';
import { checkKey, checkAndAssignChildrenKey } from './renderDOM/key';

const { createDOM } = RenderDOM;

export default class Element {
  static createElement(...args) {
    return new Element(...args);
  }

  static render = createDOM;

  constructor(tagName, props, ...children) {
    props = props || {};

    this.tagName = tagName;
    this.props = props;
    this.children = children;
    this.key = checkKey(props.key) ? props.key : void 0;

    checkAndAssignChildrenKey(this.children);
    Object.defineProperties(this, {
      $childrenKeyChecked: {
        value: true
      }
    });
  }

  render() {
    return Element.render(this);
  }
}
