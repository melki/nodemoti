
/**
 * Module dependencies.
 */

var sessionActual, on_off="off";
var express = require('express')
  , routes = require('./app/controllers')
  , user = require('./app/controllers/user')
  , http = require('http')  
  , db = require('./app/models/db')
  , fs = require('fs')
  , path = require('path');
var serialport = require("serialport"),       // include the serialport library
  SerialPort  = serialport.SerialPort;      // make a local instance of serial
var i=0;
var app = express();
var serialData = {};  
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


 
var myPort = new SerialPort("/dev/ttyACM0", { 
  // look for return and newline at the end of each data packet:
  baudrate: 115200,
  parser: serialport.parsers.readline("\r\n")
});


  
var mongoose = require( 'mongoose' );
var motiModel = mongoose.model('moti');
var nbSessionsModel = mongoose.model('nbSessions');
var setDataModel = mongoose.model('setData');


app.get('/', routes.index);
app.get('/home', routes.index);
app.get('/graphs', routes.graphs);
app.get('/data', routes.data);
app.get('/particles', routes.particles);
app.get('/d3js', routes.d3js);
app.get('/list', routes.list);
app.get('/list/*', routes.session);



var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {

  socket.emit("on_offInfo", on_off );
  // if there's a socket client, listen for new serial data:  
  
  socket.on('machine', function (data)
  {
     var nbPoints=0;
     var theDate = new Date(data[0]);
     var theDate2 = new Date(data[1]);
     var action = data[2];
     
     var session = data[3];
     theDate.setHours(theDate.getHours() + 2);
     theDate2.setHours(theDate2.getHours() + 2);
      
     var newSet = new setDataModel({date1 : theDate});
     newSet.date2 = theDate2;
     newSet.action = action;
     newSet.session = session;
     newSet.save(function (err) {
       if (err) { throw err; }
        console.log('dataset succesfully add ! '+ newSet);
        });
        


          
    
    
  });


  socket.on('delete', function (data)
  {
    motiModel.remove({ session: data }, function (err) {
    if (err) return handleError(err);
    console.log('Session #'+data+' deleted');
    // removed!
    });
  });


  socket.on('on', function (data)
   {
      on_off="on";
var newSessions = new nbSessionsModel({});
newSessions.save(function (err) {
   if (err) { throw err; }
   console.log('New session !');
     });

nbSessionsModel.count( function (err, count) {
  if (err) { throw err; }
   sessionActual = count; 
  console.log('Session #%d ', count);
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


      console.log("It begins !")

   });
     socket.on('off', function (data)
   {
      on_off="off";
      console.log("It ends !")

   });
     
  myPort.on('data', function (data) {
    // set the value property of scores to the serial string:
    

  if(i>9 && on_off=="on"){
  socket_data = JSON.parse(data.replace(/ /g,""));
  
   var newData = new motiModel({ x : socket_data.accel.x});
   newData.session = sessionActual;
   newData.y = socket_data.accel.y;
   newData.z = socket_data.accel.z;
   newData.pitch = socket_data.gyro.pitch;
   newData.yaw = socket_data.gyro.yaw;
   newData.roll = socket_data.gyro.roll;
   newData.save(function (err) {
   if (err) { throw err; }
   console.log('data ajouté avec succès !');
     });
  }
  i++;
  serialData.value = data;
    // for debugging, you should see this in Terminal:

    // send a serial event to the web client with the data:
    socket.emit('serialEvent', serialData);
  });
});

