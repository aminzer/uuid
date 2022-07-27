import { parse } from '../../src';

const EXPECT_ERROR = 'EXPECT_ERROR';

type ExpectedResult = Buffer | typeof EXPECT_ERROR;

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

describe('parse', () => {
  const expectedBuffer = Buffer.from('1111222233334444aaaabbbb55556666', 'hex');
  const expectedDefaultValidationOption = true;

  const testCases: TestCase[] = [
    {
      description: 'when input value is string in wrong format',
      inputValue: 'this-is-not-uuid',
      expectedResult: {
        withValidation: EXPECT_ERROR,
        withoutValidation: Buffer.from('this-is-not-uuid', 'hex'),
      },
    },
    {
      description: 'when input value contains extra chars besides UUID',
      inputValue: '11112222-3333-4444-aaaa-bbbb55556666-EXTRA-CHARS-HERE',
      expectedResult: {
        withValidation: EXPECT_ERROR,
        withoutValidation: Buffer.from(
          '1111222233334444aaaabbbb55556666EXTRACHARSHERE',
          'hex',
        ),
      },
    },
    {
      description: 'when input value is uppercase UUID with hyphens',
      inputValue: '11112222-3333-4444-AAAA-BBBB55556666',
      expectedResult: expectedBuffer,
    },
    {
      description: 'when input value is lowercase UUID without hyphens',
      inputValue: '1111222233334444aaaabbbb55556666',
      expectedResult: expectedBuffer,
    },
    {
      description: 'when input value is uppercase UUID without hyphens',
      inputValue: '1111222233334444AAAABBBB55556666',
      expectedResult: expectedBuffer,
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
                Buffer.compare(parse(inputValue, options), expectedValue),
              ).toBe(0);
            });
          }
        });
      });
    });
  });
});
