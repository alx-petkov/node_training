
const fs = require('fs');
const csv = require('csvtojson');
const propsObj = require('minimist')(process.argv.slice(2));
const propsKeys = Object.keys(propsObj);
let showHelp = ['h', 'help'].indexOf(propsKeys[1]) + 1; // 2.d

/* var args = require('minimist')(process.argv.slice(2), {
  alias: { h: 'help', a: 'action', f: 'file', p: 'path' },
  unknown: function (arg) {
      if (arg){
          console.log('you passed an unexpected argument');
      }
   } // invoked on unknown param 
}) */


var actions = {
    // node ./utils/streams.js -a reverse
    reverse: function(str) {
        process.stdin.on('data', function(data){
            const inputStr = data.toString().trim();
            process.stdout.write(inputStr.split("").reverse().join("") + "\n");
        })
    },
    // node ./utils/streams.js -a transform
    transform: function(str) { 
        process.stdin.on('data', function(data){
            const inputStr = data.toString().trim();
            process.stdout.write(inputStr.toUpperCase() + "\n");
        })
    },
    // node ./utils/streams.js -a outputFile -f ../data/file_1.csv
    outputFile: function(filePath) { 
        outputStream = fs.createReadStream(__dirname + "/" + filePath, 'utf8');
        outputStream.pipe(process.stdout);
    },
    // node ./utils/streams.js -a convertFromFile -f ../data/file_1.csv
    convertFromFile: function(filePath) {
        let readStream = fs.createReadStream(__dirname + "/" + filePath, 'utf8');
        // readStream.pipe(process.stdout);
        let chunks = [];


        // Handle any errors while reading
        readStream.on('error', err => {
            // handle error
            console.error(err);
        });

        // Listen for data
        readStream.on('data', chunk => {
            csv()
            .fromString(chunk.trim())
            .on('json',(jsonLine)=>{ //parsing finished
                chunks.push(jsonLine);
            })
        });

        // File is done being read
        readStream.on('close', () => {
            // Output the converted data
            process.stdout.write(JSON.stringify(chunks));
        });
    },
    // node ./utils/streams.js -a convertToFile -f ../data/file_1.csv
    convertToFile: function(filePath) {
        fs.createReadStream(__dirname + "/" + filePath, 'utf8')
            .pipe(csv())
            .pipe(fs.createWriteStream(__dirname + "/" + filePath.replace('csv', 'json')));
    },
    // node ./utils/streams.js -a cssBlunder -p ../data/file_1.csv
    cssBlunder: function(dirPath){

        var fileNames = fs.readdirSync(__dirname + "/" + dirPath);
        var wstream = fs.createWriteStream(__dirname + "/" + dirPath + '/bundle.css');
        let chunks = [];
        let test = 0;

        fileNames.forEach(function(file){
                let readStream = fs.createReadStream(__dirname + "/" + dirPath + '/' + file, 'utf8');
                   
                // Handle any errors while reading
                readStream.on('error', err => {
                    // handle error
                    console.error(err);
                 });

                // Listen for data
                readStream.on('data', chunk => {
                    chunks.push(chunk.trim());
                    wstream.write(chunk);
                });

                // File is done being read
                readStream.on('close', () => {
                    test = 5;
                    // Output the converted data
                    // process.stdout.write(JSON.stringify(chunks));
                    wstream.write('\n\r end of file' + file + '======== \n\r');
                });
        })
        console.log(chunks, test);

        /*fs.readdir(__dirname + "/" + dirPath, function(err, filenames) {
            if (err) {
                console.error(err);
                return;
            }
            console.log(filenames);
            filenames.forEach(function(filename) {
                fs.readFile(__dirname + "/" + dirPath + filename, 'utf-8', function(err, content) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    // onFileContent(filename, content);
                    console.log(filename, content);
                    fs.createWriteStream(__dirname + "/" + dirPath + 'bundle.css');
                });
            });
        });*/


    }
   
};


if(propsKeys.length <= 1){
    // node ./utils/streams.js
    console.log('no argemunets passed');
    showHelp = true;
}

if (showHelp){
    // node ./utils/streams.js -h
    console.log('this is useless help message');
    return;
};

const actionName = propsObj['a'] ? propsObj['a'] : propsObj['action'];
const filePath = propsObj['f'] ? propsObj['f'] : propsObj['file'];
const dirPath = propsObj['p'] ? propsObj['p'] : propsObj['path'];

if(actionName == 'cssBlunder'){
    actions[actionName](dirPath); 
} else{
    actions[actionName](filePath);
}
