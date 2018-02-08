import * as PATCHES from '../update/constant/patches';
import _ from '@/utils';
import { isElement } from '../element';
import propsDiff from './propsDiff';
import listDiff, { NULL_ELEMENT } from './listDiff';

/**
 * @param {Element} oldTree
 * @param {Element} newTree
 * @returns {Object}
 */
function diff(oldTree, newTree) {
  const index = 0;
  const patches = {};
  diffWalk(oldTree, newTree, index, patches);
  return patches;
}

function diffWalk(oldElem, newElem, index, patches) {
  const currentPatch = [];

  if (newElem === NULL_ELEMENT) {
    // did nothing here
    // oldElem will be removed when compare with patches of itself
  } else if (
    (_.isString(oldElem) || _.isNumber(oldElem)) &&
    (_.isString(newElem) || _.isNumber(newElem))
  ) {
    // use loose equal to let string match number string
    if (oldElem != newElem) {
      currentPatch.push({ type: PATCHES.TEXT, payload: newElem });
    }
  } else if (
    isElement(oldElem) &&
    isElement(newElem) &&
    oldElem.tagName === newElem.tagName &&
    oldElem.key === newElem.key
  ) {
    const propsPatches = propsDiff(oldElem, newElem);
    if (propsPatches) {
      currentPatch.push({ type: PATCHES.PROPS, payload: propsPatches });
    }
    diffChildren(oldElem.children, newElem.children, index, patches, currentPatch);
  } else {
    // TODO:
    // null, undefined will still be render as new comment node
    currentPatch.push({ type: PATCHES.REPLACE, payload: newElem });
  }

  if (currentPatch.length) {
    patches[index] = currentPatch;
  }
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {
  oldChildren = _.flatten(oldChildren, true);
  newChildren = _.flatten(newChildren, true);

  const listDiffs = listDiff(oldChildren, newChildren);
  const { children: nextChildren, moves } = listDiffs;
  if (moves.length) {
    currentPatch.push({ type: PATCHES.REORDER, payload: moves });
  }

  let currentIndex = index;
  let leftNode = null;
  oldChildren.forEach((child, idx) => {
    currentIndex =
      leftNode && leftNode.count ? currentIndex + leftNode.count + 1 : currentIndex + 1;
    const newChild = nextChildren[idx];
    diffWalk(child, newChild, currentIndex, patches);
    leftNode = child;
  });
}

export default diff;
