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

export const UUID_WITH_HYPHENS_REGEX = createUuidRegex('-');

export const UUID_WITHOUT_HYPHENS_REGEX = createUuidRegex('');
