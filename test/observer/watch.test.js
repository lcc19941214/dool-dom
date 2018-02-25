import observe, { watch } from '@/observer';

describe('watch observer', () => {
  let obj;
  let a;
  let handler;

  beforeEach(() => {
    obj = {
      a: { b: { c: 'c' } },
      arr: [{ i: 'i' }]
    };
    a = 0;
    handler = () => a++;
  });

  test('watch object', () => {
    observe(obj);
    watch(obj, 'a.b.c', handler);
    obj.a.b.c = 'd';
    obj.a.B = 'B';
    expect(a).toBe(1);
  });

  test('watch array', () => {
    observe(obj);
    watch(obj, 'arr', handler, { deep: true });
    obj.arr[0].i = 'j';
    expect(a).toBe(1);
  });

  test('watch object deeply', () => {
    observe(obj);
    watch(obj, null, handler, { deep: true });
    obj.a.b.c = 'd';
    expect(a).toBe(1);
  });

  test('watch unobserved object', () => {
    watch(obj, 'a.b.c', handler);
    obj.a.b.c = 'd';
    expect(a).toBe(0);
  });

  test('watch an unexpected path', () => {
    const tryToWatch = () => {
      observe(obj);
      watch(obj, '', handler);
    };
    expect(tryToWatch).not.toThrow();
  });
});
