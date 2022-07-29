import { isValid } from '../validation';
import { addHyphens } from '../utils';

export default (
  uuidBytes: Uint8Array,
  {
    validate = true,
    hyphens = true,
    uppercase = false,
  }: {
    validate?: boolean;
    hyphens?: boolean;
    uppercase?: boolean;
  } = {},
): string => {
  let uuid = [...uuidBytes]
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  if (validate && !isValid(uuid, { hyphens: false })) {
    throw new Error(`Invalid UUID format: "${uuid}"`);
  }

  if (hyphens) {
    uuid = addHyphens(uuid);
  }

  if (uppercase) {
    uuid = uuid.toUpperCase();
  }

  return uuid;
};
