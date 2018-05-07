import fs from 'fs';
// import { EventEmitter } from 'events';
import myEm from './emitter';

class DirWatcher {
    constructor(location) {
        this.location = location;
        this.files = [];

        // this.emitter = new EventEmitter();
        this.emitter = myEm;
        // this.emitter.addListener("test", this.readFiles);
    };


    readDir() {

        const test = fs.readdirSync( this.location);

      if(this.files.length < test.length){ // toDo check with lodash isEqual()
          this.files = test;
          this.emitter.emit('test', this.location, test);
      }


      console.log('readDir', test)
    };

}

export default DirWatcher;

