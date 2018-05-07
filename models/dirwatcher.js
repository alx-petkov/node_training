import fs from 'fs';
import myEm, { eventName } from './emitter';
import * as _ from 'lodash';


class DirWatcher {
    constructor(location) {
        this.location = location;
        this.files = [];
        this.emitter = myEm;
    };

    watch(delay) {
        // setInterval(this.readDirSync.bind(this), delay);
        setInterval(this.readDirAsync.bind(this), delay);
    }


    readDirSync() {

        const filesArr = fs.readdirSync( this.location);

        if(!_.isEqual(this.files, filesArr)){
            this.files = filesArr;
            this.emitter.emit(eventName, this.location, filesArr);
        }

        console.log('another dirWatcher Sync interval has passed')
    };

    readDirAsync() {

        fs.readdir( this.location, (err, filesArr)=> {
            if(err){
                console.log(err)
            }
            if(!_.isEqual(this.files, filesArr)){
                this.files = filesArr;
                this.emitter.emit(eventName, this.location, filesArr);
            }
            console.log('another dirWatcher Async interval has passed')
        });

    };

}

export default DirWatcher;
