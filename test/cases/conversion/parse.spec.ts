import { parse } from '../../../src';
import { areBytesEqual } from '../../utils/bytes';

const EXPECT_ERROR = 'EXPECT_ERROR';

type ExpectedResult = Uint8Array | typeof EXPECT_ERROR;

interface TestCase {
  description: string;
  inputValue: any;
  expectedResult:
  | ExpectedResult
  | {
    withValidation: ExpectedResult;
    withoutValidation: ExpectedResult;
  };
}

describe('conversion > parse', () => {
  const expectedBytes = Buffer.from('1111222233334444aaaabbbb55550000', 'hex');
  const expectedDefaultValidationOption = true;

  const testCases: TestCase[] = [
    {
      description: 'when input value is string in wrong format',
      inputValue: 'xxx-yyy-zzz',
      expectedResult: {
        withValidation: EXPECT_ERROR,
        withoutValidation: Buffer.alloc(16),
      },
    },
    {
      description: 'when input value contains extra chars after UUID',
      inputValue: '11112222-3333-4444-aaaa-bbbb55550000-some-more-data',
      expectedResult: {
        withValidation: EXPECT_ERROR,
        withoutValidation: expectedBytes,
      },
    },
    {
      description: 'when input value is lowercase UUID with hyphens',
      inputValue: '11112222-3333-4444-aaaa-bbbb55550000',
      expectedResult: expectedBytes,
    },
    {
      description: 'when input value is uppercase UUID with hyphens',
      inputValue: '11112222-3333-4444-AAAA-BBBB55550000',
      expectedResult: expectedBytes,
    },
    {
      description: 'when input value is lowercase UUID without hyphens',
      inputValue: '1111222233334444aaaabbbb55550000',
      expectedResult: expectedBytes,
    },
    {
      description: 'when input value is uppercase UUID without hyphens',
      inputValue: '1111222233334444AAAABBBB55550000',
      expectedResult: expectedBytes,
    },
  ];

  testCases.forEach(({ description, inputValue, expectedResult }) => {
    describe(description, () => {
      [undefined, true, false].forEach((validateOption) => {
        describe(`when "validate" option is ${validateOption}`, () => {
          const options = validateOption === undefined
            ? undefined
            : { validate: validateOption };

          const resultKey = validateOption ?? expectedDefaultValidationOption
            ? 'withValidation'
            : 'withoutValidation';

          const expectedValue = expectedResult?.[resultKey] ?? expectedResult;

          if (expectedValue === EXPECT_ERROR) {
            it('throws error', () => {
              expect(() => {
                parse(inputValue, options);
              }).toThrow();
            });
          } else {
            it('returns valid buffer', () => {
              expect(
                areBytesEqual(
                  parse(inputValue, options),
                  expectedValue,
                ),
              ).toBe(true);
            });
          }
        });
      });
    });
  });
});
