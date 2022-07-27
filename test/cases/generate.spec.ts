import { generate, isValid } from '../../src';

describe('generate', () => {
  it('generates UUID string with hyphens', () => {
    const generatedUuid = generate();

    expect(generatedUuid.length).toBe(36);
    expect(isValid(generatedUuid, { hyphens: true })).toBe(true);
  });
});
