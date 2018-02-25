/**
 * @see vue: https://github.com/vuejs/vue/blob/dev/src/core/observer/index.js
 */

import _ from '@/utils';
import { EventHub } from '../event';

export const INTERNAL_FLAG = '$ob';

/**
 * observe given value with iteration
 * @param {*} val
 */
export default function observe(val) {
  if (_.isArray(val) || _.isObject(val)) {
    return new Observer(val).value;
  }

  return val;
}

export class Observer {
  static target = null;

  static isObserver(val) {
    if (_.isArray(val) || _.isObject(val)) {
      const { [INTERNAL_FLAG]: observer } = val;
      return observer instanceof Observer;
    }

    return false;
  }

  constructor(val) {
    this.value = val;

    _.def(this, 'key', { value: _.createHash() });
    _.def(this.value, INTERNAL_FLAG, { value: this });

    this.walk(val);
  }

  walk(val) {
    if (_.isArray(val)) {
      /**
       * vue modified the array item, assign the prototype method to it
       * @see https://cn.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9
       */

      // TODO:
      // cases as below will not trigger eventHub
      // 1. array.item = newItem
      // 2. array.length = newLength

      val.forEach(v => observe(v));
    } else {
      Object.keys(val).forEach(name => {
        this.defineProperty(val, name, val[name]);
      });
    }
  }

  defineProperty(obj, name, value) {
    const property = Object.getOwnPropertyDescriptor(obj, name);
    if (property && property.configurable === false) return;

    const getter = property && property.get;
    const setter = property && property.set;

    const id = _.createHash();
    const watcher = new EventHub();

    // TODO:
    // add condition: if `!deep`, not observe child
    observe(value);

    _.def(obj, name, {
      configurable: true,
      enumerable: true,
      get: function observerGetter() {
        const val = getter ? getter.call(obj) : value;

        if (Observer.target) {
          watcher.on(id, Observer.target);
        }

        return val;
      },
      set: function observerSetter(newValue) {
        if (setter) {
          setter.call(obj, newValue);
        } else {
          value = newValue;
        }

        observe(newValue);
        watcher.emit(id, newValue);
      }
    });
  }
}

const observerTrace = [];

export const pushTarget = target => {
  if (Observer.target) observerTrace.push(Observer.target);
  Observer.target = target;
};

export const popTarget = () => {
  Observer.target = observerTrace.pop();
};
