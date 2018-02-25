import _ from '@/utils';
import { Observer, pushTarget, popTarget } from './observer';
import { toPath } from 'lodash';

/**
 *
 * @param {*} obj
 * @param {string|null} path @see `lodash.get`
 * @param {function} watcher
 * @param {object} options
 */
export default function watch(obj, path, watcher, options = {}) {
  if (!Observer.isObserver(obj)) return;

  const { deep = false } = options;
  
  pushTarget(watcher);

  const target = path ? _.get(obj, toPath(path)) : obj;
  if (deep) {
    traverse(target);
  }

  popTarget();
}

function traverse(obj) {
  if (!Observer.isObserver(obj)) return;

  if (_.isArray(obj)) {
    obj.forEach(v => traverse(v));
  } else {
    Object.keys(obj).forEach(key => traverse(obj[key]));
  }
}
