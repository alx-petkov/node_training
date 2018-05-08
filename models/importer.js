import fs from "fs";
import myEm, { eventName } from './emitter';
import csv from 'csvtojson';
// import { promisify } from 'util';
// usign custom promisify because of older node version - 6.9
const promisify = f => (...args) => new Promise((a,b)=>f(...args, (err, res) => err ? b(err) : a(res)));

const readPromise = promisify(fs.readFile);

const encoding = 'utf8';


class Importer {
    constructor() {

        this.emitter = myEm;
        this.emitter.addListener(eventName, this.readFiles.bind(this));
    }

    readFiles(location, files){

        const that = this;

        files.forEach((fileName) => {
           const path = location + fileName; 
           // const contentS = that.importSync(path);
           // that.logFormated(path, contentS)
           // that.import(path);
           
           that.importPromise(path)
           .then(
               (contentP) => that.logFormated(path, contentP), 
               () => console.log('error has occured')
           );
        });
    };

    logFormated(path, content){ 
        console.log('\n', path, '======content reads=====>');
        csv()
        .fromString(content)
        .on('json',(jsonLine)=>{ //parsing finished
            console.log(jsonLine);
        })
    }


    importSync(path){ 
        const content = fs.readFileSync( path, encoding);
        return content;
    }

    import(path){
       fs.readFile(path, encoding, (err, contentA) => {
           if(err){ 
               console.log(err); 
            } else {
                this.logFormated(path, contentA);
            }
       })
    }

    importPromise(path){
        return readPromise(path, encoding)
        .then((content) => content )
        .catch((err) => {  console.log(err); })
    }
}

export default Importer;
