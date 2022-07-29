import { generateBytes } from '../../../src';
import { areBytesEqual } from '../../utils/bytes';

jest.mock('../../../src/generation/generate', () => ({
  __esModule: true,
  default: jest.fn(() => '11112222-3333-4444-aaaa-bbbb55556666'),
}));

const expectedBytes = Buffer.from('1111222233334444aaaabbbb55556666', 'hex');

describe('generation > generateBytes', () => {
  it('generates UUID bytes', () => {
    const uuidBytes = generateBytes();

    expect(areBytesEqual(uuidBytes, expectedBytes)).toBe(true);
  });
});
