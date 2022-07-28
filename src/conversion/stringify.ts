import { isValid } from '../validation';
import { addHyphens } from '../utils';

export default (
  uuidBuffer: Buffer,
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
  let uuid = uuidBuffer.toString('hex');

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
