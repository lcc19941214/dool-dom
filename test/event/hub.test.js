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

  test('emit unregistered event would throw warning', () => {
    const hub = new EventHub({ allowUnregistered: false });
    const foo = () => {
      hub.emit('test');
    };
    expect(foo).toConsoleWarn();
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
});
