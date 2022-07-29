import {
  UUID_WITH_HYPHENS_REGEX,
  UUID_WITHOUT_HYPHENS_REGEX,
} from './patterns';

export default (
  uuid: any,
  { hyphens = true }: { hyphens?: boolean | 'any' } = {},
): boolean => {
  if (typeof uuid !== 'string') {
    return false;
  }

  let allowedPatterns: RegExp[] = [];

  if (hyphens === true) {
    allowedPatterns = [UUID_WITH_HYPHENS_REGEX];
  } else if (hyphens === false) {
    allowedPatterns = [UUID_WITHOUT_HYPHENS_REGEX];
  } else {
    allowedPatterns = [UUID_WITH_HYPHENS_REGEX, UUID_WITHOUT_HYPHENS_REGEX];
  }

  return allowedPatterns.some((regex) => regex.test(uuid.toLowerCase()));
};
