import { isValid } from '../../../src';

interface TestCase {
  description: string;
  inputValue: any;
  expectedResult:
  | boolean
  | {
    requireHyphens: boolean;
    requireNoHyphens: boolean;
    ignoreHyphens: boolean;
  };
}

describe('validation > isValid', () => {
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
      inputValue: '11112222-3333-4444-aaaa-bbbb55550000-EXTRA-CHARS-HERE',
      expectedResult: false,
    },
    {
      description: 'when input value is lowercase UUID with hyphens',
      inputValue: '11112222-3333-4444-aaaa-bbbb55550000',
      expectedResult: {
        requireHyphens: true,
        requireNoHyphens: false,
        ignoreHyphens: true,
      },
    },
    {
      description: 'when input value is uppercase UUID with hyphens',
      inputValue: '11112222-3333-4444-AAAA-BBBB55550000',
      expectedResult: {
        requireHyphens: true,
        requireNoHyphens: false,
        ignoreHyphens: true,
      },
    },
    {
      description: 'when input value is lowercase UUID without hyphens',
      inputValue: '1111222233334444aaaabbbb55550000',
      expectedResult: {
        requireHyphens: false,
        requireNoHyphens: true,
        ignoreHyphens: true,
      },
    },
    {
      description: 'when input value is uppercase UUID without hyphens',
      inputValue: '1111222233334444AAAABBBB55550000',
      expectedResult: {
        requireHyphens: false,
        requireNoHyphens: true,
        ignoreHyphens: true,
      },
    },
  ];

  testCases.forEach(({ description, inputValue, expectedResult }) => {
    describe(description, () => {
      const hyphensOptions: (boolean | any | undefined)[] = [
        undefined,
        true,
        false,
        'any',
      ];

      hyphensOptions.forEach((hyphensOption) => {
        describe(`when "hyphens" option is ${hyphensOption}`, () => {
          const options = hyphensOption === undefined
            ? undefined
            : { hyphens: hyphensOption };

          let expectedValue = expectedResult;

          if (typeof expectedResult === 'object') {
            switch (hyphensOption) {
              case undefined:
              case true:
                expectedValue = expectedResult.requireHyphens;
                break;

              case false:
                expectedValue = expectedResult.requireNoHyphens;
                break;

              case 'any':
                expectedValue = expectedResult.ignoreHyphens;
                break;

              default:
                expectedValue = expectedResult;
            }
          }

          it(`returns ${expectedValue}`, () => {
            expect(isValid(inputValue, options)).toBe(expectedValue);
          });
        });
      });
    });
  });
});
