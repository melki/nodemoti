var socket = io.connect('http://localhost:8080');

var data = [220, 330, 510];
var color = d3.scale.category10();

 var svgContainer = d3.select("div.test").append("svg")
                                     .attr("width", 900)
                                     .attr("height", 900);
 
 var circles = svgContainer.selectAll("circle")
                           .data(data)
                           .enter()
                          	.append("circle");

var circleAttributes = circles
                       .attr("cx", function (d) { return d; })
                       .attr("cy", function (d) { return d/2; })
                       .attr("r", 20 )
                       .style("fill",function (d) {return color(d);});

 socket.on('serialEvent', function (socket_data)
   {
    socket_data = JSON.parse(socket_data.value.replace(/ /g,""));
    // push a new data point onto the back
    data=[socket_data.gyro.yaw, socket_data.gyro.pitch, socket_data.gyro.roll];

	   
  // redraw the line, and slide it to the left
  circles
      .transition(500)
       .attr("r", function (d,i) { return Math.abs(data[i]/2); } )
      .each("end", false);
 
      //.style("stroke",color(Math.floor((socket_data.accel.z+20)/80)))
  // pop the old data point off the front
  //data.shift();
    
    });
 
