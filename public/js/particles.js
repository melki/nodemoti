var socket = io.connect('http://localhost:8080');

var w = 900;
var h = 500;
var z = d3.scale.category10();
var i = 0;

var a = 0;
var b = 0;
var c = 0;
var d = 0;
var e = 0;
var f = 0;

var svg = d3.select("div#area").append("svg:svg")
		.attr("width", w)
		.attr("height", h)
		.style("pointer-events", "all");


 socket.on('serialEvent', function (socket_data){
	socket_data = JSON.parse(socket_data.value.replace(/ /g,""));

	b = socket_data.accel.x*1.5+250;
	a = socket_data.accel.y*1.5+450;
	c = (a+c)/2;
	d = (b+d)/2;
	e = 2*(a+c)/3;
	f = 2*(b+d)/3;

	svg.append("svg:circle")
			.attr("cx", c)
			.attr("cy", d)
			.attr("r", 1e-6)
			.style("stroke", z(++i))
			.style("stroke-opacity", 1)
		.transition()
			.duration(2000)
			.ease(Math.sqrt)
			.attr("r", 100)
			.style("stroke-opacity", 1e-6)
			.remove();

	c = a;
	d = b;

	svg.append("svg:circle")
			.attr("cx", a)
			.attr("cy", b)
			.attr("r", 1e-6)
			.style("stroke", z(++i))
			.style("stroke-opacity", 1)
		.transition()
			.duration(2000)
			.ease(Math.sqrt)
			.attr("r", 100)
			.style("stroke-opacity", 1e-6)
			.remove();
 });
