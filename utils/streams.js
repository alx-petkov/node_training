
var comands = require('minimist')(process.argv.slice(2));

const passedKeys = Object.keys(comands);

let showHelp = ['h', 'help'].indexOf(passedKeys[1]) + 1;


console.log(comands, passedKeys, 'hello', showHelp);



// Main actions to be called

function reverse(str) { console.log('reverse')};
function transform(str) { console.log('transform')};
function outputFile(filePath) { console.log('otputFile')};
function convertFromFile(filePath) { console.log('convertFromFile') };
function convertToFile(filePath) { console.log('convertToFile') };

if(passedKeys.length <= 1){
    console.log('wrong input');
    showHelp = true;
}

if (showHelp){
    console.log('help usage message');
};
