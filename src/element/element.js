import RenderDOM from '@/renderDOM';
import { checkKey, checkAndAssignChildrenKey } from '@/renderDOM/key';
import _ from '@/utils';

const { createDOM } = RenderDOM;

export const isDoolElement = val => val instanceof Element;

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

    this.count = computeChildCount(children);
  }

  render() {
    return Element.render(this);
  }
}

function computeChildCount(children) {
  let count = 0;
  _.flatten(children).forEach(child => {
    if (isDoolElement(child)) {
      count += child.count;
    }
    count++;
  });
  return count;
}
