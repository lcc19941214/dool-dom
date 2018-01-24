/**
 * return error as '[key] should be [accept], but got [target]'
 * 
 * @param {string} key - target name
 * @param {string} accept - accept types
 * @param {any} target
 */
export const checkTypeError = (key, accept, target) => {
  console.error('%s should be %s, but got %s', key, accept, Object.prototype.toString.call(target));
};

export const preservedPropertyWarning = (target, prop) => {
  console.warning('%s is preserved in %, your declaration will be skipped', prop, target);
};
