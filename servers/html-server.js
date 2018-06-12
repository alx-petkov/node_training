const fs = require('fs');
const http = require('http');
// node ./servers/html-server.js


// 404 response
const notFoundResponse = (response) => {
    response.writeHead(404, { "Content-Type": "text/plain"});
    response.write("Error 404: Page not found");
    response.end();
}

// Handle valid request
const requestCallback = (request, response) => {
    if(request.method === "GET" && request.url === '/'){
        response.writeHead(200, { "Content-Type": "text/html"});
        fs.createReadStream("./index.html").pipe(response);
    } else {
        notFoundResponse(response);
    }
}

http
.createServer()
.on('request', requestCallback)
.listen(7000);

console.log('html server is now running at port 7000');