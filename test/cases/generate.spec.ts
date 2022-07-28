import { generate, isValid } from '../../src';

const isUuidV4 = (uuid: string): boolean => (
  uuid[14] === '4' && ['8', '9', 'a', 'b'].includes(uuid[19])
);

describe('generate', () => {
  const iterationCount = 10_000;

  const uuids = Array(iterationCount).fill(null).map(() => generate());

  it('returns valid UUID', () => {
    expect(uuids.every((uuid) => isValid(uuid))).toBe(true);
  });

  it('returns v4 UUID', () => {
    expect(uuids.every((uuid) => isUuidV4(uuid))).toBe(true);
  });
});
