export default class EventHub {
  constructor(options = {}) {
    this.hub = {};

    const { verbose = false, allowUnregistered = true } = options;
    this.verbose = verbose;
    this.allowUnregistered = allowUnregistered;
  }

  on(key, handler) {
    const hub = this.hub;
    hub[key] = hub[key] || [];
    if (this.verbose || hub[key].indexOf(handler) === -1) {
      hub[key].push(handler);
    }
  }

  off(key, handler) {
    const hub = this.hub;
    hub[key] = hub[key] || [];
    hub[key] = hub[key].filter(v => v !== handler);
  }

  emit(key, ...args) {
    const hub = this.hub;
    if (hub[key]) {
      hub[key].forEach(handler => handler(...args));
    } else if (!this.allowUnregistered) {
      console.warn(`no handler is registered to event key: ${key}`);
    }
  }
}
