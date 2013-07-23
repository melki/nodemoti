function load() {

	var socket = io.connect('http://localhost:8080');

	var last_data = 0;

	var color = ["#b0d02e", "#e94366", "#51a5cb","#f08f33","#333333","#777777"];

	var n        = 1000;
	var	nbGraphs = 3;

	data = new Array();
	text = new Array();
	path = new Array();
	svg  = new Array();

	data[0] = new Array();
	data[1] = new Array();

	data[0][0] = d3.range(n).map(d3.random.normal(22, 0));
	data[0][1] = d3.range(n).map(d3.random.normal(10, 0));
	data[0][2] = d3.range(n).map(d3.random.normal(230, 0));
	data[1][0] = d3.range(n).map(d3.random.normal(0, 0));
	data[1][1] = d3.range(n).map(d3.random.normal(0, 0));
	data[1][2] = d3.range(n).map(d3.random.normal(-150, 0));


	var letter = [['X','Y','Z'],['YAW','PITCH','ROLL']];

	var margin = {top: 10, right: 70, bottom: 20, left: 30};
	var width  = 830 - margin.left - margin.right;
	var height = 300 - margin.top - margin.bottom;

	var x = d3.scale.linear()
			.domain([0, n - 1])
			.range([0, width]);

	var y = d3.scale.linear()
			.domain([-350, 350])
			.range([height, 0]);

	var line = d3.svg.line()
			.interpolate("basis")
			.x(function(d, i) { return x(i); })
			.y(function(d, i) { return y(d); });


	for (var j = 0 ; j < 2 ; j++) {

	svg[j] = d3.select("graphs")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg[j].append("defs").append("clipPath")
			.attr("id", "clip")
		.append("rect")
			.attr("width", width)
			.attr("height", height);

	svg[j].append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")");


	svg[j].append("g")
			.attr("class", "y axis")
			.call(d3.svg.axis().scale(y).orient("left"));


	 path[j] = svg[j].append("g").selectAll("path")
			.data(data[j])
			.enter()
			.append("path")
			.attr("clip-path", "url(#clip)")
			.attr("class", "line")
			.attr("d", line)
			.style("stroke",function (d, i){
				return color[i + 1];
			});

	 text[j] = svg[j].append("g").selectAll("text")
			.data(data[j])
			.enter()
			.append("text")
			.attr("x", 730)
			.attr("y", function (d, i){
				return ((data[j][i][998] *- 1) + 350) * 270 / 700;
			})
			.style("fill",function (d, i){
				return color[i + 1];
			})
			.text(function (d, i){
				return letter[j][i];
			});

	 };

	socket.on('serialEvent', function (socket_data){

		socket_data = JSON.parse(socket_data.value.replace(/ /g,""));
		// push a new data point onto the back
		data[0][0].push(socket_data.accel.x);
		data[0][1].push(socket_data.accel.y);
		data[0][2].push(socket_data.accel.z);
		data[1][0].push(socket_data.gyro.yaw);
		data[1][1].push(socket_data.gyro.pitch);
		data[1][2].push(socket_data.gyro.roll);

		for (var j = 0; j < 2; j++) {
			// redraw the line, and slide it to the left
			path[j].attr("d", line)
				.attr("transform", null)
				.transition()
				.duration(500)
				.ease("linear")
				.attr("transform", "translate(" + x(0) + ")")
				.each("end", false);

			text[j].data(data[j])
				.transition()
				.duration(5)
				.attr("y", function (d, i){
					return ((data[j][i][998] *- 1) + 350) * 270 / 700;
				})
				.attr("x", function (d, i){
					if(i > 0){
						if(Math.abs(((data[j][i - 1][998] *- 1 + 350) * 270 / 700) - ((data[j][i][998] *- 1 + 350) * 270/700)) <= 12){
							return 740 + j * 24;
						}
						else if(i === 2 && Math.abs(((data[j][i - 2][998] *- 1 + 350) * 270 / 700) - ((data[j][i][998] *- 1 + 350) *270 / 700)) <= 12){
							return 740 + j * 24;
						}
						else{
							return 730;
						}
					}
					else
					{
						 return 730;
					}
				})
				.each("end",false);

			for (var i = 0 ; i < nbGraphs ; i++){
				data[j][i].shift();
			};
		};
	});
}

window.addEventListener("load", load, true);


