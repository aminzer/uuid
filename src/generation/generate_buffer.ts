import { parse } from '../conversion';
import generate from './generate';

export default (): Buffer => parse(generate());
