import { generateBuffer } from '../../src';

jest.mock('../../src/generation/generate', () => ({
  __esModule: true,
  default: jest.fn(() => '11112222-3333-4444-aaaa-bbbb55556666'),
}));

const expectedBuffer = Buffer.from('1111222233334444aaaabbbb55556666', 'hex');

describe('generateBuffer', () => {
  it('generates UUID Buffer', () => {
    const uuidBuffer = generateBuffer();

    expect(Buffer.compare(uuidBuffer, expectedBuffer)).toBe(0);
  });
});
