import { isEventHandler, EVENT_HANDLER_PROP } from '../property/DOMProperty';
import _ from '@/utils';
import { checkTypeErrorWithWarning } from '@/helper/logTipsHelper';

const getEventName = handlerName =>
  handlerName.replace(EVENT_HANDLER_PROP, (...args) => args[1].toLowerCase());

export function addEventListener(elem, event, handler) {
  elem.addEventListener(event, handler, false);
}

export function removeEventListener(elem, event, handler) {
  elem.removeEventListener(event, handler, false);
}

export function addEventHandlerForProps(elem, props) {
  if (!props) return;

  Object.keys(props).forEach(name => {
    const handler = props[name];
    if (isEventHandler(name)) {
      if (_.isFunc(handler)) {
        addEventListener(elem, getEventName(name), handler);
      } else {
        checkTypeErrorWithWarning(`The value of ${name}`, 'Function', handler);
      }
    }
  });
}

export function updateEventHandler(elem, props) {
  const oldHandlers = {};
  const newHandlers = {};

  Object.keys(props).forEach(name => {
    const { oldHandler, newHandler } = props[name];
    oldHandlers[name] = oldHandler;
    newHandlers[name] = newHandler;
  });

  Object.keys(oldHandlers).forEach(name => {
    removeEventListener(elem, getEventName(name), oldHandlers[name]);
  });

  addEventHandlerForProps(elem, newHandlers);
}
