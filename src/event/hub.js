import _ from '@/utils';

const HUB = {};

export default class EventHub {
  constructor(options = {}) {
    this.id = _.createHash();
    HUB[this.id] = {};

    const { verbose = false, allowUnregistered = true } = options;
    this.verbose = verbose;
    this.allowUnregistered = allowUnregistered;

    if (_DEV_) {
      this.hub = HUB[this.id];
    }
  }

  on(key, handler) {
    const hub = HUB[this.id];
    hub[key] = hub[key] || [];
    if (this.verbose || hub[key].indexOf(handler) === -1) {
      hub[key].push(handler);
    }
  }

  off(key, handler) {
    const hub = HUB[this.id];
    hub[key] = hub[key] || [];
    hub[key] = hub[key].filter(v => v !== handler);
  }

  emit(key, ...args) {
    const hub = HUB[this.id];
    if (hub[key]) {
      hub[key].forEach(handler => handler(...args));
    } else if (!this.allowUnregistered) {
      console.warn(`no handler is registered to event key: ${key}`);
    }
  }
}
