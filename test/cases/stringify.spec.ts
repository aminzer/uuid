import { stringify } from '../../src';

interface TestCase {
  options?: {
    hyphens?: boolean;
    uppercase?: boolean;
  };
  expectedResult: string;
}

describe('stringify', () => {
  const inputBuffer = Buffer.from('1111222233334444aaaabbbb55556666', 'hex');

  const testCases: TestCase[] = [
    {
      options: undefined,
      expectedResult: '11112222-3333-4444-aaaa-bbbb55556666',
    },
    {
      options: {},
      expectedResult: '11112222-3333-4444-aaaa-bbbb55556666',
    },
    {
      options: { hyphens: false },
      expectedResult: '1111222233334444aaaabbbb55556666',
    },
    {
      options: { hyphens: true },
      expectedResult: '11112222-3333-4444-aaaa-bbbb55556666',
    },
    {
      options: { uppercase: false },
      expectedResult: '11112222-3333-4444-aaaa-bbbb55556666',
    },
    {
      options: { uppercase: true },
      expectedResult: '11112222-3333-4444-AAAA-BBBB55556666',
    },
    {
      options: { hyphens: false, uppercase: true },
      expectedResult: '1111222233334444AAAABBBB55556666',
    },
  ];

  describe(`when input buffer: ${inputBuffer.toString('hex')}`, () => {
    testCases.forEach(({ options, expectedResult }) => {
      const formattedOptions = options ? JSON.stringify(options) : options;

      describe(`when options: ${formattedOptions}`, () => {
        it(`returns ${expectedResult}`, () => {
          expect(stringify(inputBuffer, options)).toBe(expectedResult);
        });
      });
    });
  });
});
