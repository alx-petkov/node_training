const http = require('http');
// node ./servers/json-server.js

const product = {
   id: 1,
   name: 'Supreme T-Shirt',
   brand: 'Supreme',
   price: 99.99,
   options: [
       { color: 'blue' },
       { size: 'XL' }
   ]
};

const requestCallback = (request, response) => {
    console.log('a user made a request' + request.url);
    response.writeHead(200, {"Content-Type": "application/json"});
    var jsonData = JSON.stringify({ product: product});
    response.end(jsonData);
}

http
.createServer()
.on('request', requestCallback)
.listen(7000);

console.log('server is now running at port 7000');