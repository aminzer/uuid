/* eslint-disable import/no-mutable-exports, global-require */

let generateNative: null | (() => string) = null;

try {
  const crypto = typeof window === 'object'
    ? window.crypto
    : require('crypto');

  generateNative = crypto ? () => crypto.randomUUID() : null;
} catch (err) {
  // ignored
}

export default generateNative;
