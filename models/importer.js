import fs from "fs";
import myEm, { eventName } from './emitter';


const encoding = 'utf8';

class Importer {
    constructor() {

        this.emitter = myEm;
        this.emitter.addListener(eventName, this.readFiles.bind(this));
    }

    readFiles(location, files){

        const that = this;

        files.forEach((fileName) => {
           // that.importSync(location + fileName);
           that.import(location + fileName)
        });
    };

    import(path){ // toDo return a promise and convert scv to json
        fs.readFile(path, encoding, (err, content) => {
            if(err){
                console.log(err);
            }
            console.log( path, '======Async content read=====>', '\n', content, '\n');
        })
    }

    importSync(path){ // toDo convert csv to json
        const content = fs.readFileSync( path, encoding);
        console.log( path, '======Sync content read=====>', '\n', content, '\n');
    }

}

export default Importer;
