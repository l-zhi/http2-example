var spdy = require('spdy');
var http = require('http');
var fs = require('fs');

var	options = {
  	key: fs.readFileSync(__dirname + '/domain.key'),
	cert: fs.readFileSync(__dirname + '/chained.pem')
}


var port = 8080;
var port2 = 8081;

var server = require('./app')

var _router = require('./router');

server
  .use(_router.routes())
  .use(_router.allowedMethods());


var http2server = spdy.createServer(options, server.callback());

server.listen(port);
http2server.listen(port2);

console.log('Application listening on port ' + port + ', https on port ' + port2 + '.');

