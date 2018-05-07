
import DirWatcher from './models/dirwatcher';
import Importer from './models/importer';

const dirPath = "././data/";

const Dir1 = new DirWatcher(dirPath);

const Imp1 = new Importer();

Dir1.watch(10000);


//const config = require('./config/config.json');
//console.log(config.name);

// onst UserClass = require('./models/User.js');
// onst ProductClass = require('./models/Product.js');

