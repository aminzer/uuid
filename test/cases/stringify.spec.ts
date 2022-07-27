import { stringify } from '../../src';

interface ValidTestCase {
  options?: {
    hyphens?: boolean;
    uppercase?: boolean;
  };
  expectedResult: string;
}

describe('stringify', () => {
  describe('when input buffer contains data in UUID format', () => {
    const validInputBuffer = Buffer.from('1111222233334444aaaabbbb55556666', 'hex');

    const validTestCases: ValidTestCase[] = [
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
    validTestCases.forEach(({ options, expectedResult }) => {
      const formattedOptions = options ? JSON.stringify(options) : options;

      describe(`when options: ${formattedOptions}`, () => {
        it(`returns ${expectedResult}`, () => {
          expect(stringify(validInputBuffer, options)).toBe(expectedResult);
        });
      });
    });

    describe('when input buffer contains data not in UUID format', () => {
      const invalidInputBuffer = Buffer.from('1122eeff', 'hex');

      describe('when "validate" option isn\'t set', () => {
        it('throws error', () => {
          expect(() => {
            stringify(invalidInputBuffer);
          }).toThrow();
        });
      });

      describe('when "validate" option is set to false', () => {
        it('returns stringified buffer', () => {
          expect(stringify(invalidInputBuffer, { validate: false })).toBe('1122eeff');
        });
      });
    });
  });
});
