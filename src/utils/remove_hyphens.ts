export default (uuid: string): string => (
  uuid.replace(/-/g, '')
);
