import { addHyphens } from './utils';

export default (
  uuidBuffer: Buffer,
  {
    hyphens = true,
    uppercase = false,
  }: {
    hyphens?: boolean;
    uppercase?: boolean;
  } = {},
): string => {
  let uuid = uuidBuffer.toString('hex');

  if (hyphens) {
    uuid = addHyphens(uuid);
  }

  if (uppercase) {
    uuid = uuid.toUpperCase();
  }

  return uuid;
};
