import { parse } from '../conversion';
import generate from './generate';

export default (): Uint8Array => parse(generate());
