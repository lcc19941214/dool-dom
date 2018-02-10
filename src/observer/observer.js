import _ from '@/utils';
import { EventHub } from '../event';

const eventHub = new EventHub();

/**
 * observe given value with iteration
 * @param {*} val
 * @param {function} watcher
 */
export default function observe(val, watcher) {
  if (_.isArray(val) || _.isObject(val)) {
    return new Observer(val, watcher).value;
  }

  return val;
}

export class Observer {
  constructor(val, watcher) {
    this.value = val;

    Object.defineProperties(this, {
      key: { value: _.createHash() }
    });

    Object.defineProperties(this.value, {
      _ob: { value: this }
    });

    this.dfsWalk(val, watcher);
  }

  composeKey(str) {
    return str + '$' + this.key;
  }

  dfsWalk(val, watcher) {
    if (_.isArray(val)) {
      // TODO:
      // cases as below will not trigger eventHub
      // 1. array.item = newItem
      // 2. array.length = newLength

      val.forEach(v => observe(v, watcher));
      return;
    }

    Object.keys(val).forEach(name => {
      this.defineProperty(name, val[name], watcher);
    });
  }

  defineProperty(name, value, watcher) {
    const key = this.composeKey`${name}`;
    if (watcher) {
      eventHub.on(key, watcher);
    }

    let rst = observe(value, watcher);
    Object.defineProperty(this.value, name, {
      configurable: true,
      enumerable: true,
      get: () => rst,
      set: newValue => {
        rst = observe(newValue, watcher);
        eventHub.emit(key, rst);
      }
    });
  }
}
