import fs from "fs";
import { EventEmitter } from 'events';
import myEm from './emitter';


class Importer {
    constructor() {
        // super();
        // this.location = location;
        // this.files = files;

        // this.emitter = new EventEmitter();
        this.emitter = myEm;
        this.emitter.addListener("test", this.readFiles);
    }

    readFiles(path, files){
        // console.log(files);
        files.forEach((fileName) => {
             const test = fs.readFileSync( path + fileName, 'utf8');
             console.log(fileName, test)
        });
    };

}


export default Importer;

