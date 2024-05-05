export const isFunction = (v) => Object.prototype.toString.call(v) === '[object Function]';
export const isObject = (v) => Object.prototype.toString.call(v) === '[object Object]';
export const empty = () => { };