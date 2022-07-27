import { isValid } from '../../src';

interface TestCase {
  description: string;
  inputValue: any;
  expectedResult:
  | boolean
  | {
    withHyphens: boolean;
    withoutHyphens: boolean;
  };
}

describe('isValid', () => {
  const expectedDefaultHyphensOption = true;

  const testCases: TestCase[] = [
    {
      description: 'when input value is undefined',
      inputValue: undefined,
      expectedResult: false,
    },
    {
      description: 'when input value is null',
      inputValue: null,
      expectedResult: false,
    },
    {
      description: 'when input value is string in wrong format',
      inputValue: 'this-is-not-uuid',
      expectedResult: false,
    },
    {
      description: 'when input value contains extra chars besides UUID',
      inputValue: '11112222-3333-4444-aaaa-bbbb55556666-EXTRA-CHARS-HERE',
      expectedResult: false,
    },
    {
      description: 'when input value is lowercase UUID with hyphens',
      inputValue: '11112222-3333-4444-aaaa-bbbb55556666',
      expectedResult: {
        withHyphens: true,
        withoutHyphens: false,
      },
    },
    {
      description: 'when input value is uppercase UUID with hyphens',
      inputValue: '11112222-3333-4444-AAAA-BBBB55556666',
      expectedResult: {
        withHyphens: true,
        withoutHyphens: false,
      },
    },
    {
      description: 'when input value is lowercase UUID without hyphens',
      inputValue: '1111222233334444aaaabbbb55556666',
      expectedResult: {
        withHyphens: false,
        withoutHyphens: true,
      },
    },
    {
      description: 'when input value is uppercase UUID without hyphens',
      inputValue: '1111222233334444AAAABBBB55556666',
      expectedResult: {
        withHyphens: false,
        withoutHyphens: true,
      },
    },
  ];

  testCases.forEach(({ description, inputValue, expectedResult }) => {
    describe(description, () => {
      [undefined, true, false].forEach((hyphensOption) => {
        describe(`when "hyphens" option is ${hyphensOption}`, () => {
          const options = hyphensOption === undefined
            ? undefined
            : { hyphens: hyphensOption };

          const resultKey = hyphensOption ?? expectedDefaultHyphensOption
            ? 'withHyphens'
            : 'withoutHyphens';

          const expectedValue = expectedResult?.[resultKey] ?? expectedResult;

          it(`returns ${expectedValue}`, () => {
            expect(isValid(inputValue, options)).toBe(expectedValue);
          });
        });
      });
    });
  });
});
