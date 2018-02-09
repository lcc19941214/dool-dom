import observe from '@/observer';

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
  const observedFoo = observe(foo, watcher);
  return { foo, observedFoo };
}

function getObservedArray(watcher) {
  const foo = [1, getFoo(), true, [getNestedFoo(), getFoo()]];
  const observedFoo = observe(foo, watcher);
  return { foo, observedFoo };
}

describe('observe', () => {
  test('observe value which not an object', () => {
    expect(observe('1')).toBe('1');
  });
});

describe('observe an object', () => {
  let foo;
  let observedFoo;

  beforeAll(() => {
    const { foo: f, observedFoo: o } = getObservedObject();
    foo = f;
    observedFoo = o;
  });

  test('observed object should have `_ob` property', () => {
    expect(observedFoo).toHaveProperty('_ob.value', foo);
  });

  test('change observed object property', () => {
    observedFoo.name = 'foo';
    expect(observedFoo.name).toBe('foo');
  });
});

describe('observe an nested object', () => {
  const { observedFoo } = getNestedObservedObject();
  test('nested observed object should have `_ob` property', () => {
    expect(observedFoo).toHaveProperty('props.foo._ob.value', observedFoo.props.foo);
  });
});

describe('watcher', () => {
  test('watch object value change', () => {
    let a = 0;
    const handler = () => a++;
    const { observedFoo } = getObservedObjectWithWatcher(handler);
    observedFoo.name = 'Bob';
    observedFoo.age = 10;
    expect(a).toBe(2);
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
    expect(bar).toHaveProperty('props.foo._ob.value', bar.props.foo);
  });

  test('watch array item value change', () => {
    const bar = observedFoo[3][1];
    bar.name = 'Bob';
    bar.name = 10;
    expect(a).toBe(2);
  });
});
