import { EventHub } from '@/event';
import 'jest-plugin-console-matchers/setup';

describe('EventHub', () => {
  let hub;
  let a;
  let handler;

  beforeEach(() => {
    hub = new EventHub();
    a = 0;
    handler = () => a++;
  });

  test('registered event should be fired', () => {
    hub.on('a', handler);
    hub.on('a', handler);
    hub.emit('a');

    expect(a).toBe(1);
  });

  test('removed subscription should not be fired', () => {
    let b;

    hub.off('a', handler);
    hub.on('a', handler);
    hub.emit('a');
    b = a;

    hub.off('a', handler);
    hub.emit('a');

    expect(b).toBe(a);
  });

  test('multiple subscription', () => {
    hub = new EventHub({ verbose: true });
    hub.on('a', handler);
    hub.on('a', handler);
    hub.on('a', handler);
    hub.emit('a');

    expect(a).toBe(3);
  });

  test('unexpected handler should not throw error', () => {
    const tryWatchUndefined = () => {
      hub.on('a');
      hub.emit('a');
    };
    expect(tryWatchUndefined).not.toThrow();
  });

  test('emitAll and clearAll method should work', () => {
    let b;

    hub.on('a', handler);
    hub.on('b', handler);
    hub.emitAll();

    b = a;
    hub.clearAll();
    hub.emitAll();

    expect(a).toBe(b);
  });
});
