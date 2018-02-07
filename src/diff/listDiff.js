import * as PATCHES from '../patches/constant/patches';

/**
 * diff two given array with position exchanges
 * @returns {Object} - { moves: <Array>, children: <Array> }
 */
export default function listDiff(oldList, newList) {
  const oldMap = makeKeyItemAndFree(oldList);
  const newMap = makeKeyItemAndFree(newList);

  const { keyItem: oldKeyItem } = oldMap;
  const { keyItem: newKeyItem, free: newFree } = newMap;

  const moves = [];
  const children = [];
  let freeIndex = 0;

  // check whether old item is still exist
  oldList.forEach(item => {
    const key = getItemKey(item);
    if (key) {
      if (newKeyItem.hasOwnProperty) {
        const newItem = newKeyItem[key];
        children.push(newItem);
      } else {
        children.push(null);
      }
    } else {
      const freeItem = newFree[freeIndex++];
      children.push(freeItem || null);
    }
  });

  const mockList = children.concat();

  // remove items not exist
  mockList.forEach((item, i) => {
    if (item === null) {
      remove(i);
    }
  });

  let j = 0;
  newList.forEach((item, i) => {
    const itemKey = getItemKey(item);

    const mockItem = mockList[j];
    const mockKey = getItemKey(mockItem);

    if (mockItem) {
      if (itemKey === mockKey) {
        j++;
      } else {
        if (!oldKeyItem.hasOwnProperty(itemKey)) {
          insert(i, item);
        } else {
          // if remove current simulateItem make item in right place
          // then just remove it
          var nextItemKey = getItemKey(mockList[j + 1]);
          if (nextItemKey === itemKey) {
            remove(i);
            removeMock(j);
            j++;
          } else {
            insert(i, item);
          }
        }
      }
    } else {
      insert(i, item);
    }
  });

  function remove(index) {
    moves.push({ type: PATCHES.REORDER_REMOVE, index });
  }

  function insert(index, item) {
    moves.push({ type: PATCHES.REORDER_INSERT, index, payload: item });
  }

  function removeMock(index) {
    mockList.splice(index, 1);
  }

  return {
    moves,
    children
  };
}

function makeKeyItemAndFree(list) {
  const keyItem = {};
  const free = [];

  list.forEach(item => {
    const key = getItemKey(item);
    if (key) {
      keyItem[key] = item;
    } else {
      free.push(item);
    }
  });

  return {
    keyItem,
    free
  };
}

function getItemKey(item) {
  if (!item) return;
  return item.key;
}
