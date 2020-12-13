// Node.js WebSocket server script
var http = require('http');
fs = require('fs');


const WebSocketServer = require('websocket').server;
const wsServer = http.createServer();
wsServer.listen(5001);

const wsServerAttach = new WebSocketServer({
    httpServer: wsServer
});


var html;
fs.readFile('clientExample.html', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  html = data;
});

var server = http.createServer(function (req, res) {
    if (req.url == '/') {
        console.log('here');
        res.setHeader('Set-Cookie','jim=jam');
        res.setHeader('Content-Type', 'text/html');
        res.write(html);
        res.end();
    }
    else {
        // check the cookie value...
        var cookVal = req.headers.cookie.split('=');
        console.log(cookVal[1]);

    }

});
server.listen(5000);


wsServerAttach.on('request', function(request) {
    const connection = request.accept(null, request.origin);
    connection.on('message', function(message) {
      console.log('Received Message:', message.utf8Data);
      connection.sendUTF('Hi this is WebSocket server!');

    });

    console.log(request);
    connection.on('close', function(reasonCode, description) {
        console.log('Client has disconnected.');
    });
});
