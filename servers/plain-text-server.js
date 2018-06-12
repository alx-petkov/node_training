const http = require('http');
// node ./servers/plain-text-server.js

const requestCallback = (request, response) => {
    console.log('a user made a request' + request.url);
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("this is a 'Hellow world' plain text response");
    response.end();
}

http
// .createServer(requestCallback)
.createServer()
.on('request', requestCallback)
.listen(3000);

console.log('server is now running at port 3000');