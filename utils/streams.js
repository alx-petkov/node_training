
const propsObj = require('minimist')(process.argv.slice(2));
const propsKeys = Object.keys(propsObj);
let showHelp = ['h', 'help'].indexOf(propsKeys[1]) + 1; // 2.d

/* var args = require('minimist')(process.argv.slice(2), {
  alias: { h: 'help', a: 'action', f: 'file' },
  unknown: function (arg) {
      if (arg){
          console.log('you passed an unexpected argument');
      }
   } // invoked on unknown param 
}) */


var actions = {
    reverse: function(str) {
        process.stdin.on('data', function(data){
            const inputStr = data.toString().trim();
            process.stdout.write(inputStr.split("").reverse().join("") + "\n");
        })
    },
    transform: function(str) { 
        process.stdin.on('data', function(data){
            const inputStr = data.toString().trim();
            process.stdout.write(inputStr.toUpperCase() + "\n");
        })
    },
    outputFile: function(filePath) { console.log('otputFile')},
    convertFromFile: function(filePath) { console.log('convertFromFile') },
    convertToFile: function(filePath) { console.log('convertToFile') }
   
};


if(propsKeys.length <= 1){
    console.log('no argemunets passed');
    showHelp = true;
}

if (showHelp){
    console.log('this is useless help message');
    return;
};

const actionName = propsObj['a'] ? propsObj['a'] : propsObj['action'];

actions[actionName]();

