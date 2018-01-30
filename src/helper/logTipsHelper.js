/**
 * @param {string} key - target name
 * @param {string} accept - accept types
 * @param {any} target
 * @example key should be accept, but got [object Target]
 */
export const typeError = (key, accept, target) => {
  const text = '%s should be %s, but got %s';
  let index = 0;
  const arr = [
    key,
    accept,
    target == null ? String(target) : Object.prototype.toString.call(target)
  ];
  const str = text.replace(/%s/g, () => {
    return arr[index++];
  });
  return str;
};

export const checkTypeErrorWithWarning = (...args) => {
  console.warn(typeError(...args));
};

export const preservedPropertyWarning = (target, prop) => {
  console.warn('%s is preserved, your declaration will be skipped', prop, target);
};
