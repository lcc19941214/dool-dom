import {
  getPropertyInfo,
  shouldIgnoreProperty,
  isEventHandler
} from '../renderDOM/property/DOMProperty';

function diffObject(pre, next) {
  const diffs = {};
  Object.keys(pre).forEach(key => {
    if (pre[key] !== next[key]) {
      diffs[key] = next[key];
    }
  });

  Object.keys(next).forEach(key => {
    if (!pre.hasOwnProperty(key)) {
      diffs[key] = next[key];
    }
  });
  return diffs;
}

function diffEventHandler(preProps, nextProps) {
  const preHandlers = {};
  const nextHandlers = {};

  [[preProps, preHandlers], [nextProps, nextHandlers]].forEach(v => {
    const [props, handlers] = v;
    Object.keys(props).forEach(name => {
      if (isEventHandler(name)) handlers[name] = props[name];
    });
  });

  const diffs = {};

  Object.keys(preHandlers).forEach(key => {
    if (preHandlers[key] !== nextHandlers[key]) {
      diffs[key] = {
        newHandler: nextHandlers[key],
        oldHandler: preHandlers[key]
      };
    }
  });

  Object.keys(nextHandlers).forEach(key => {
    if (!preHandlers.hasOwnProperty(key)) {
      diffs[key] = {
        newHandler: nextHandlers[key]
      };
    }
  });

  return diffs;
}

function diffStyle(preProps, nextProps) {
  const { style: pre = {} } = preProps;
  const { style: next = {} } = nextProps;

  // TODO:
  // handle ES5 Object.keys TypeError

  const diffs = diffObject(pre, next);

  if (!Object.keys(diffs).length) {
    return null;
  }

  return diffs;
}

function diffProps(preProps, nextProps) {
  const props = diffObject(preProps, nextProps);
  let diffs = {};

  /**
   * do not check whether the prop should be removed here,
   * `setValueForProperty` will handle this
   *
   * a little bit verbose
   */
  Object.keys(props).forEach(name => {
    const value = props[name];
    const propertyInfo = getPropertyInfo(name);
    if (!propertyInfo) return;

    if (shouldIgnoreProperty(name, value, propertyInfo)) return;
    diffs[name] = value;
  });

  const styleDiffs = diffStyle(preProps, nextProps);
  if (styleDiffs) diffs.style = styleDiffs;

  const eventHandlerDiffs = diffEventHandler(preProps, nextProps);
  if (eventHandlerDiffs) diffs = { ...diffs, ...eventHandlerDiffs };

  if (!Object.keys(props).length) {
    return null;
  }

  return diffs;
}

export default function propsDiff(oldNode, newNode) {
  
  const preProps = oldNode.props || {};
  const nextProps = newNode.props || {};
  const diffs = diffProps(preProps, nextProps);
  return diffs;
}
