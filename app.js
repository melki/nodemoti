/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var serialport = require("serialport"),				// include the serialport library
	SerialPort  = serialport.SerialPort;			// make a local instance of serial
		  

var app = express();
var serialData = {};	
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var myPort;

serialport.list(function (err, ports) {
	ports.forEach(function(port) {
		if(port.manufacturer.indexOf("Arduino") != -1){
				myPort = new SerialPort(port.comName,{
				baudrate: 115200,
				parser: serialport.parsers.readline("\r\n")	
			});
		}
	});
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/home', routes.index);
app.get('/graphs', routes.graphs);
app.get('/data', routes.data);
app.get('/particles', routes.particles);


var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	// if there's a socket client, listen for new serial data:  
	myPort.on('data', function (data) {
		// set the value property of scores to the serial string:
		serialData.value = data;
		// for debugging, you should see this in Terminal:

		// send a serial event to the web client with the data:
		socket.emit('serialEvent', serialData);
	});
});
