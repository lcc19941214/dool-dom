import _ from '@/utils';

export default class EventHub {
  constructor(options = {}) {
    this.id = _.createHash();
    _.def(this, 'hub', { value: {} });

    const { verbose = false } = options;
    this.verbose = verbose;
  }

  on(key, handler) {
    const hub = this.hub;
    hub[key] = hub[key] || [];
    if ((hub[key].indexOf(handler) === -1 || this.verbose) && _.isFunc(handler)) {
      hub[key].push(handler);
    }
  }

  off(key, handler) {
    const hub = this.hub;
    hub[key] = hub[key] || [];
    hub[key] = hub[key].filter(v => v !== handler);
  }

  emit(key, ...args) {
    if (this.hub[key]) {
      this.hub[key].forEach(handler => handler(...args));
    }
  }

  emitAll(...args) {
    Object.keys(this.hub).forEach(key => {
      this.emit(key, ...args);
    });
  }

  clear(key) {
    this.hub[key] = undefined;
  }

  clearAll() {
    Object.keys(this.hub).forEach(key => {
      this.clear(key);
    });
  }
}
