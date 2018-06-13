// const fs = require('fs');
const http = require('http');
// node ./servers/echo-server.js


const echoCallback = (request, response) => {
    console.log('echoing user request');
    request.pipe(response);
}

http
.createServer()
.on('request', echoCallback)
.listen(9000);

console.log('html server is now running at port 9000');