import observe, { watch } from '@/observer';
import { eventHub, composeObserverKey, getObserverKey } from '@/observer/observer';

describe('watch observer value change', () => {
  let obj;
  let a;
  let handler;

  beforeEach(() => {
    obj = { a: { b: { c: 'c' } } };
    a = 0;
    handler = () => a++;
  });

  test('watch observer', () => {
    observe(obj);
    watch(obj, 'a.b.c', handler);
    obj.a.b.c = 'd';
    obj.a.B = 'B';
    expect(a).toBe(1);
  });

  test('watch unobserved object', () => {
    watch(obj, 'a.b.c', handler);
    obj.a.b.c = 'd';
    expect(a).toBe(0);
  });

  test('watch a property not existed', () => {
    observe(obj);
    watch(obj, 'a.b.d', handler);
    const key = composeObserverKey(getObserverKey(obj.a.b), 'b');
    expect(eventHub.hub[key]).not.toBeDefined();
  });

  test('watch an unexpected path', () => {
    const tryToWatch = () => {
      observe(obj);
      watch(obj, '', handler);
    };
    expect(tryToWatch).not.toThrow();
  });
});
