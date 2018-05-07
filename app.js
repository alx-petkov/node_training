
import DirWatcher from './models/dirwatcher';
import Importer from './models/importer';

// const Dir1 = new DirWatcher();
//
// console.log(Dir1);
//
// Dir1.readDir();

const Imp1 = new Importer('././data/', [ 'file_1.csv', 'file_2.csv', 'file_3.csv' ]);
Imp1.readFiles();
// console.log(list);

//const config = require('./config/config.json');
//console.log(config.name);

// onst UserClass = require('./models/User.js');
// onst ProductClass = require('./models/Product.js');

