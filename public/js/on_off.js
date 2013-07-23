
var socket       = io.connect();
var on_offActual = "off";
var link         = document.getElementById('on_off');

socket.on('on_offInfo', function (info){
	if(info == "on"){
		on_offActual="on";
		link.innerHTML="On";
		link.style.backgroundColor = "green";
	}
	else if(info == "off"){
		on_offActual="off";
		link.innerHTML="Off";
		link.style.backgroundColor = "red";
	}
});

function on_off(){
	var send = 0;

	if(on_offActual == "on" && send == 0){
		socket.emit('off');
		on_offActual = "off";
		send =1 ;
		link.innerHTML = "Off";
		link.style.backgroundColor = "red";
	}
	if(on_offActual == "off" && send == 0){
		socket.emit('on');
		on_offActual = "on";
		send =1 ;
		link.innerHTML = "On";
		link.style.backgroundColor = "green";
	}
}

function deleteSession (session){
	socket.emit('delete', session);
}

