/* eslint-disable import/prefer-default-export */

export const areBytesEqual = (
  bytes1: Uint8Array,
  bytes2: Uint8Array,
): boolean => {
  const buffer1 = Buffer.from(bytes1);
  const buffer2 = Buffer.from(bytes2);

  return Buffer.compare(buffer1, buffer2) === 0;
};
