import { generate, isValid } from '../../../src';
import { removeHyphens } from '../../../src/utils';

const isUuidV4 = (uuid: string): boolean => {
  const hex = removeHyphens(uuid);

  return hex[12] === '4' && ['8', '9', 'a', 'b'].includes(hex[16]);
};

describe('generation > generate', () => {
  const iterationCount = 10_000;

  describe('when "hyphens" isn\'t set', () => {
    const uuids = Array(iterationCount).fill(null).map(() => generate());

    it('returns valid UUID with hyphens', () => {
      expect(uuids.every((uuid) => isValid(uuid, { hyphens: true }))).toBe(true);
    });

    it('returns v4 UUID', () => {
      expect(uuids.every((uuid) => isUuidV4(uuid))).toBe(true);
    });
  });

  describe('when "hyphens" option is false', () => {
    const uuids = Array(iterationCount).fill(null).map(() => generate({ hyphens: false }));

    it('returns valid UUID without hyphens', () => {
      expect(uuids.every((uuid) => isValid(uuid, { hyphens: false }))).toBe(true);
    });

    it('returns v4 UUID', () => {
      expect(uuids.every((uuid) => isUuidV4(uuid))).toBe(true);
    });
  });
});
