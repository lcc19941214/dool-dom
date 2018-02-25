import observe, { watch } from '@/observer';
import _ from '@/utils';
import { INTERNAL_FLAG } from '@/observer/observer';

const getFoo = () => ({ name: 'bar', age: 25 });
const getNestedFoo = () => ({
  name: 'bar',
  age: 25,
  props: {
    sex: 'male',
    degree: 'bachelor',
    figure: {
      height: '185cm',
      weight: '163kg'
    }
  }
});

function getObservedObject() {
  const foo = getFoo();
  const observedFoo = observe(foo);
  return { foo, observedFoo };
}

function getNestedObservedObject() {
  const foo = getNestedFoo();
  const observedFoo = observe(foo);
  return { foo, observedFoo };
}

function getObservedObjectWithWatcher(watcher) {
  const foo = getFoo();
  const observedFoo = observe(foo);
  watch(observedFoo, null, watcher, { deep: true });
  return { foo, observedFoo };
}

function getObservedArray(watcher) {
  const bar = {
    foo: [1, getFoo(), true, [getNestedFoo(), getFoo()]]
  };
  const observedBar = observe(bar);
  watch(observedBar, null, watcher, { deep: true });
  return { foo: bar.foo, observedFoo: observedBar.foo };
}

describe('observe unobservable value', () => {
  test('value should be return equally', () => {
    expect(observe('1')).toBe('1');
  });
});

describe('observe object', () => {
  let foo;
  let observedFoo;

  beforeAll(() => {
    const { foo: f, observedFoo: o } = getObservedObject();
    foo = f;
    observedFoo = o;
  });

  test('observed object should have `INTERNAL_FLAG` property', () => {
    expect(observedFoo).toHaveProperty(`${INTERNAL_FLAG}.value`, foo);
  });

  test('change observed object property', () => {
    observedFoo.name = 'foo';
    expect(observedFoo.name).toBe('foo');
  });

  test('existed getter or setter should be fired', () => {
    let a = 1;

    foo = {};
    _.def(foo, 'bar', {
      enumerable: true,
      configurable: true,
      get: () => a,
      set: newVal => (a = newVal)
    });

    observe(foo);
    expect(foo.bar).toBe(1);

    foo.bar = 2;
    expect(a).toBe(2);
  });
});

describe('observe an nested object', () => {
  const { observedFoo } = getNestedObservedObject();
  test('nested observed object should have `INTERNAL_FLAG` property', () => {
    expect(observedFoo).toHaveProperty(`props.foo.${INTERNAL_FLAG}.value`, observedFoo.props.foo);
  });
});

describe('observer target', () => {
  let a;
  let handler;

  beforeEach(() => {
    a = 0;
    handler = () => a++;
  });

  test('watch object value change should work', () => {
    const { observedFoo } = getObservedObjectWithWatcher(handler);
    observedFoo.name = 'Bob';
    observedFoo.age = 10;
    expect(a).toBe(2);
  });

  test('watch nested object value change should work', () => {
    const bar = observe({ a: { b: { c: 'd' } } });
    watch(bar, null, handler, { deep: true });
    bar.a.b.c = 'e';
    expect(a).toBe(1);
  });
});

describe('observe and watch array', () => {
  let observedFoo;
  let a = 0;

  beforeAll(() => {
    const handler = () => a++;
    const { observedFoo: o } = getObservedArray(handler);
    observedFoo = o;
  });

  test('observed array should work', () => {
    const bar = observedFoo[3][0];
    expect(bar).toHaveProperty(`props.foo.${INTERNAL_FLAG}.value`, bar.props.foo);
  });

  test('watch array item value change', () => {
    const bar = observedFoo[3][1];
    bar.name = 'Bob';
    bar.name = 10;
    expect(a).toBe(2);
  });
});
