const charGroup = (length: number): string => `[0-9a-f]{${length}}`;

const charGroups: string[] = [
  charGroup(8),
  charGroup(4),
  charGroup(4),
  charGroup(4),
  charGroup(12),
];

const createUuidRegex = (groupSeparator = '') => {
  const charGroupSequence = charGroups.join(groupSeparator);

  return new RegExp(`^${charGroupSequence}$`);
};

const UUID_WITH_HYPHENS_REGEX = createUuidRegex('-');
const UUID_WITHOUT_HYPHENS_REGEX = createUuidRegex('');

export default (
  uuid: any,
  { hyphens = true }: { hyphens?: boolean } = {},
): boolean => {
  if (typeof uuid !== 'string') {
    return false;
  }

  const regex = hyphens ? UUID_WITH_HYPHENS_REGEX : UUID_WITHOUT_HYPHENS_REGEX;

  return regex.test(uuid.toLowerCase());
};
