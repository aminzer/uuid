import generateNative from './native';
import generateRandom from './random';
import { removeHyphens } from '../utils';

const generateUuid = generateNative ?? generateRandom;

export default ({ hyphens = true }: { hyphens?: boolean } = {}): string => {
  const uuid = generateUuid();

  return hyphens ? uuid : removeHyphens(uuid);
};
