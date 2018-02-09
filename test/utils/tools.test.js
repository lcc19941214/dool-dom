import tools from '@/utils/tools';

describe('tool.flatten', () => {
  test('should flatten level 1', () => {
    const arr = [1, [2, [3]]];
    expect(tools.flatten(arr)).toEqual([1, 2, [3]]);
  });

  test('should flatten level 2', () => {
    const arr = [1, [2, [3, [4]]]];
    expect(tools.flatten(arr, 2)).toEqual([1, 2, 3, [4]]);
  });

  test('should flatten all levels', () => {
    const arr = [1, [2, [3, [4, [5, [6, 7, [8]]]]]]];
    expect(tools.flatten(arr, true)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
