/*
	Lists serial ports. Copied from https://github.com/voodootikigod/node-serialport readme
*/
var serialport = require("serialport"),       // include the serialport library
  SerialPort  = serialport.SerialPort;



 var myPort; // must be declared as a global variable.

serialport.list(function (err, ports) {
	ports.forEach(function(port) {

		console.log("pnpId: " + port.pnpId);
		console.log("manufacturer: " + port.manufacturer);
		console.log("comName: " + port.comName);
		console.log("serialNumber: " + port.serialNumber);
		console.log("vendorId: " + port.vendorId);
		console.log("productId: " + port.productId);

		if(port.pnpId.indexOf("duino") != -1 || port.manufacturer.indexOf("duino") != -1 || port.comName.indexOf('moti') != -1){
				myPort = new SerialPort(port.comName,{
				baudrate: 115200,
				parser: serialport.parsers.readline("\r\n"),
			});
				console.log("Ok for port "+ port.comName);
		}
	});
});