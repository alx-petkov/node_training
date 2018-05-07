
import DirWatcher from './models/dirwatcher';

const Dir1 = new DirWatcher();

console.log(Dir1);

Dir1.readDir();

//const config = require('./config/config.json');
//console.log(config.name);

// onst UserClass = require('./models/User.js');
// onst ProductClass = require('./models/Product.js');

/*const fs = require("fs"); // reads the filenames from the dir

console.log("Going to read directory /data");
fs.readdir("./data/", function(err, files){
   if (err) {
      return console.error(err);
   }
   files.forEach( function (file){
      console.log( file );
   });
});*/
