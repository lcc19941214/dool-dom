import listDiff from '../../src/diff/listDiff';
import * as PATCHES from '../../src/update/constant/patches';

const REMOVE = PATCHES.REORDER_REMOVE;
const INSERT = PATCHES.REORDER_INSERT;

function reorder(list, moves) {
  const arr = list.concat();
  moves.forEach(move => {
    const { index, payload } = move;
    switch (move.type) {
      case INSERT:
        arr.splice(index, 0, payload);
        break;
      case REMOVE:
        arr.splice(index, 1);
        break;
      default:
        break;
    }
  });
  return arr;
}

describe('test helper', () => {
  test('reorder arr', () => {
    const arr = [1, 2, 3, 4];
    const moves = [
      { type: REMOVE, index: 1 },
      { type: INSERT, index: 2, payload: 2 },
      { type: REMOVE, index: 3 },
      { type: INSERT, index: 3, payload: 5 }
    ];
    const rst = [1, 3, 2, 5];
    expect(reorder(arr, moves)).toEqual(rst);
  });
});

describe('listDiff', () => {
  test('diff two list and reorder it', () => {
    const a = [{ key: 'a' }, { key: 'b' }, { key: 'c' }, { key: 'd' }, { key: 'h' }];
    const b = [{ key: 'a' }, { key: 'c' }, { key: 'h' }, { key: 'b' }];
    const { moves } = listDiff(a, b, 'key');

    const rst = reorder(a, moves);
    expect(rst).toEqual(b);
  });

  test('diff two list without key', () => {
    const a = [1, 2, 3, 4];
    const b = [2, 3, 5, 6, 1, 3];
    const { moves } = listDiff(a, b, 'key');
    const rst = reorder(a, moves);

    expect(rst).toHaveLength(b.length);
  });

  test('diff two list', () => {
    /** 
     * item without key in left list, which can match one in right list,
     * will not be removed or inserted
     */
    const a = [{ key: 1 }, 2, { key: 3 }, 4];
    const b = [100, { key: 2 }, { key: 3 }, 6, { key: 4 }, 3];
    const { moves } = listDiff(a, b, 'key');
    const rst = reorder(a, moves);

    expect(rst).toEqual([2, { key: 2 }, { key: 3 }, 4, { key: 4 }, 3]);
  });
});
