const fs = require("fs");

class Importer {
    constructor(location, files) {
        this.location = location;
        this.files = files;
    };


    readFiles() {
        this.files.forEach((fileName) => {
            const test = fs.readFileSync( this.location + fileName, 'utf8');
            console.log(test)
        });
    };

}

export default Importer;

