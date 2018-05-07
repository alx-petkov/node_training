const fs = require("fs");

class DirWatcher {
    constructor() {
        this.location = "././data/";
        this.files = [];
    };

    // updateFiles(err, fileNames) {
    //   if (err) {
    //      return console.log(err);
    //   } else {
    //       // return fileNames
    //     // this.files.push(fileNames);
    //       console.log(this);
    //   }
    //   fileNames.forEach( function (file){
    //      console.log( file );
    //   });
    // };

    readDir() {
      const test = fs.readdirSync( this.location);
      console.log(test)
    };

}

export default DirWatcher;

/*console.log("Going to read directory /tmp");
fs.readdir("../data/", function(err, files){
   if (err) {
      return console.error(err);
   }
   files.forEach( function (file){
      console.log( file );
   });
});*/
