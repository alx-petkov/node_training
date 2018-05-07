const fs = require("fs");

class DirWatcher {
    constructor() {
        this.location = "././data/";
        this.files = [];
    };

    updateFiles(err, fileNames) {
      if (err) {
         return console.log(err);
      } else {
        // this.files.push(fileNames);
      }
      fileNames.forEach( function (file){
         console.log( file );
      });
    };

    readDir(){
      fs.readdir( this.location, this.updateFiles.bind(this));
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
