import fs from "fs";
import myEm, { eventName } from './emitter';


class Importer {
    constructor() {

        this.emitter = myEm;
        this.emitter.addListener(eventName, this.readFiles);
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

