export const addHyphens = (uuid: string): string => [
  uuid.slice(0, 8),
  uuid.slice(8, 12),
  uuid.slice(12, 16),
  uuid.slice(16, 20),
  uuid.slice(20),
].join('-');

export const removeHyphens = (uuid: string): string => uuid.replace(/-/g, '');
