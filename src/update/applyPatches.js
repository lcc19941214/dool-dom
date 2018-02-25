import RenderDOM from '../renderDOM/';
import { setValueForProperty, setValueForInlineStyle } from '../renderDOM/property/';
import { updateEventHandler } from '../renderDOM/eventHandler/';
import * as PATCHES from './constant/patches';
import { getKeyOfNode, getKeyOfElement } from '../renderDOM/key';

export default function applyPatches(node, patches) {
  const walker = { index: 0 };
  dfsWalk(node, walker, patches);
}

function dfsWalk(node, walker, patches, idx) {
  const currentPatches = patches[walker.index];
  const { childNodes } = node;

  [...childNodes].forEach((child, idx) => {
    walker.index += 1;
    dfsWalk(child, walker, patches, idx);
  });

  if (currentPatches) {
    updateNode(node, currentPatches, idx);
  }
}

function updateNode(node, patches, idx) {
  patches.forEach(patch => {
    const { type, payload } = patch;
    switch (type) {
      case PATCHES.TEXT:
        updateTextNode(node, payload);
        break;
      case PATCHES.PROPS:
        updateProps(node, payload);
        break;
      case PATCHES.REORDER:
        reorderChildren(node, payload, idx);
        break;
      case PATCHES.REPLACE:
        replaceNode(node, payload, idx);
        break;
      default:
        throw new Error(`Unknown patch type ${type}`);
    }
  });
}

function updateTextNode(node, text) {
  // TODO:
  // to implement with IE or browsers not have textContent
  node.textContent = text;
}

function updateProps(node, props) {
  // set props
  Object.keys(props).forEach(name => {
    setValueForProperty(node, name, props[name]);
  });

  // set style
  setValueForInlineStyle(node, props['style']);

  // add event listeners
  updateEventHandler(node, props);
}

function reorderChildren(node, moves, idx) {
  const nodeList = [...node.childNodes];
  const map = {};

  nodeList.forEach(n => {
    const key = getKeyOfNode(n);
    if (key) {
      map[key] = n;
    }
  });

  moves.forEach(move => {
    const { type, payload, index } = move;
    switch (type) {
      case PATCHES.REORDER_REMOVE:
        node.removeChild(nodeList[index]);
        nodeList.splice(index, 1);
        break;
      case PATCHES.REORDER_INSERT:
        var key = getKeyOfElement(payload);
        var insertNode =
          key && map[key] ? map[key].cloneNode(true) : RenderDOM.createDOM(payload, idx);
        node.insertBefore(insertNode, nodeList[index]);
        nodeList.splice(index, 0, insertNode);
        break;
      default:
        break;
    }
  });
}

function replaceNode(node, element, defaultKey) {
  const newNode = RenderDOM.createDOM(element, defaultKey);
  node.parentNode.replaceChild(newNode, node);
}
