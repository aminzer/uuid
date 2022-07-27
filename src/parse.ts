import isValid from './is_valid';
import { removeHyphens } from './utils';

const isValidIgnoringHyphens = (uuid: string): boolean => (
  isValid(uuid, { hyphens: true })
  || isValid(uuid, { hyphens: false })
);

export default (
  uuid: string,
  { validate = false }: { validate?: boolean } = {},
): Buffer => {
  if (validate && !isValidIgnoringHyphens(uuid)) {
    throw new Error(`Invalid UUID format: "${uuid}"`);
  }

  return Buffer.from(removeHyphens(uuid), 'hex');
};
