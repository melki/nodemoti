function load() {
	// open a connection to the serial server:
	var socket = io.connect('http://localhost:8080');
	// when you get a serialdata event, do this:
	socket.on('serialEvent', function (data) {

		data = JSON.parse(data.value.replace(/ /g,''));

		x = document.getElementById("x");
		y = document.getElementById("y");
		z = document.getElementById("z");

		yaw   = document.getElementById("yaw");
		pitch = document.getElementById("pitch");
		roll  = document.getElementById("roll");

		x.innerHTML = data.accel.x;
		y.innerHTML = data.accel.y;
		z.innerHTML = data.accel.z;

		pitch.innerHTML = data.gyro.pitch;
		yaw.innerHTML   = data.gyro.yaw;
		roll.innerHTML  = data.gyro.roll;

	});
}

window.addEventListener("load", load, true);