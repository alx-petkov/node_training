import { EventEmitter } from 'events';

class MyEmitter extends EventEmitter {}

const myEm = new MyEmitter();

export default myEm;
