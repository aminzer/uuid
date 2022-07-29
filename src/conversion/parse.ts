import { isValid } from '../validation';
import { removeHyphens } from '../utils';

const isValidUuid = (uuid: string): boolean => (
  [true, false].some((hyphens) => isValid(uuid, { hyphens }))
);

export default (
  uuid: string,
  { validate = true }: { validate?: boolean } = {},
): Uint8Array => {
  if (validate && !isValidUuid(uuid)) {
    throw new Error(`Invalid UUID format: "${uuid}"`);
  }

  const prepareUuid = removeHyphens(uuid);
  const bytes: number[] = Array(16).fill(0);

  for (let byteIndex = 0; byteIndex < 16; byteIndex += 1) {
    const byteHex = prepareUuid.slice(2 * byteIndex, 2 * (byteIndex + 1));

    bytes[byteIndex] = Number.parseInt(byteHex, 16) || 0;
  }

  return new Uint8Array(bytes);
};
