import _ from '@/utils';
import { isObserver, composeObserverKey, getObserverKey, eventHub } from './observer';
import { toPath } from 'lodash';

/**
 *
 * @param {*} object
 * @param {string} path path can be any format only if lodash.get supports
 * @param {function} handler
 */
export default function watch(object, path, handler) {
  const $path = toPath(path);
  const len = $path.length;
  if (len > 1) {
    const higherPath = $path.slice(0, -1);
    const target = _.get(object, higherPath);
    const propName = $path[len - 1];

    if (isObserver(target) && propName in target) {
      const key = composeObserverKey(getObserverKey(target), propName);
      eventHub.on(key, handler);
    }
  }
}
