/* eslint-disable import/no-mutable-exports, global-require */

let generateNative: null | (() => string) = null;

try {
  const crypto = typeof window === 'object'
    ? window.crypto
    : require('crypto');

  const randomUUID = crypto?.randomUUID;

  if (typeof randomUUID === 'function') {
    generateNative = randomUUID;
  }
} catch (err) {
  // ignored
}

export default generateNative;
