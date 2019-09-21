const Vue = require('vue');
// eslint-disable-next-line import/no-extraneous-dependencies
const proxy = require('identity-obj-proxy');

Object.defineProperty(Vue.prototype, '$style', {
  enumerable: false,
  writable: false,
  value: proxy,
});
