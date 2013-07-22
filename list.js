/*
	Lists serial ports. Copied from https://github.com/voodootikigod/node-serialport readme
*/
var serialport = require("serialport"),       // include the serialport library
  SerialPort  = serialport.SerialPort;    



 var myPort; // must be declared as a global variable.

serialport.list(function (err, ports) {
	ports.forEach(function(port) {
		if(port.pnpId.indexOf("duino") != -1 || port.manufacturer.indexOf("duino") != -1){
				myPort = new SerialPort(port.comName,{
				baudrate: 115200,
				parser: serialport.parsers.readline("\r\n"),
			});
				console.log("Ok for port "+ port.comName);	
		}
	});
});