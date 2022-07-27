import generate from './generate';
import parse from './parse';

export default (): Buffer => parse(generate());
