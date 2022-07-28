import { addHyphens } from '../utils';

const randomInt = (limit: number): number => (
  Math.floor(Math.random() * limit)
);

export default (): string => {
  let uuid = '';

  for (let i = 0; i < 32; i += 1) {
    let char: string;

    if (i === 12) {
      char = '4';
    } else if (i === 16) {
      char = (8 + randomInt(4)).toString(16);
    } else {
      char = randomInt(16).toString(16);
    }

    uuid += char;
  }

  return addHyphens(uuid);
};
