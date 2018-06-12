
const fs = require('fs');
const csv = require('csvtojson');
const https = require('https');


// const propsObj = require('minimist')(process.argv.slice(2));
var propsObj = require('minimist')(process.argv.slice(2), {
  alias: { h: 'help', a: 'action', f: 'file', p: 'path' },
  unknown: function (arg) {
      if (arg){ // invoked on unknown param 
          console.log('you passed an unexpected argument');
      }
   } 
});


const propsKeys = Object.keys(propsObj);
let showHelp = ['h', 'help'].indexOf(propsKeys[1]) + 1;

// node ./utils/streams.js
if(propsKeys.length <= 1){
    
    console.log('no argemunets passed');
    showHelp = true;
}

// node ./utils/streams.js -h
if (showHelp){
    
    console.log('this is useless help message');
    return;
};


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
            process.stdout.write(JSON.stringify(chunks));
        });
    },

    // node ./utils/streams.js -a convertToFile -f ../data/file_1.csv
    convertToFile: function(filePath) {
        fs.createReadStream(__dirname + "/" + filePath, 'utf8')
            .pipe(csv())
            .pipe(fs.createWriteStream(__dirname + "/" + filePath.replace('csv', 'json')));
    },

    // node ./utils/streams.js -a cssBlunder -p ../css/
    cssBlunder: function(dirPath){
        const localDir = __dirname + "/" + dirPath;
        const bundleLocation = __dirname + "/" + dirPath + '/bundle.css';
        const webFileLocation = 'https://drive.google.com/uc?export=download&id=1tCm9Xb4mok4Egy2WjGqdYYkrGia0eh7X';
        const fileNames = fs.readdirSync(localDir);
        const wstream = fs.createWriteStream(bundleLocation);
        let finalData = '';
        let transferCount = 0;


        const downloadFile = (url) => {
            return new Promise((resolve, reject) => {
                https.get(url, (res) => {
                    if(res.headers.location) {
                        return downloadFile(res.headers.location).then(stream => resolve(stream));
                    }
                    resolve(res);
                });
            });
        };


        fileNames.forEach(function(file){
                let readStream = fs.createReadStream(localDir + '/' + file, 'utf8');

                readStream.pipe(wstream)
                
                wstream.on('finish', () => { 
                    transferCount++;
                    if(transferCount === fileNames.length){
                        console.log('all done reading local files');
                        // downloadFile(webFileLocation)
                        // .then(stream => stream.pipe(wstream));  // trows error
                    }
                } );

        })


        wstream.on('finish', () => {
            downloadFile(webFileLocation)
            .then(stream => stream.on('data', (data) => {
                finalData += data;
            }))
            .then(stream => stream.on( 'end', () => {

                fs.writeFile(bundleLocation, '\n\r' + finalData,  {'flag':'a'},  function(err) {
                    if (err) {
                        return console.error(err);
                    } else {
                        console.log('web data received and appended');
                    }
                });
            })
            );
        });

    }
   
};


const actionName = propsObj['action'];
const filePath = propsObj['file'];
const dirPath = propsObj['path'];

const actionOptions = Object.keys(actions);
const actionIndex = actionOptions.indexOf(actionName)



if (actionIndex < 0 ){
    console.log('no such action avaliable');
    return;
}

if (actionName == 'cssBlunder'){
    if (!dirPath){
        console.log('no path to read from provided');
    } else {
        actions[actionName](dirPath); 
    } 
    return;
}

if(actionIndex > 1){
    if (!filePath){
        console.log('no file to read from provided');
    } else {
       actions[actionName](filePath); 
    }
    return;
}

if(actionIndex + 1){
    actions[actionName]();
}
