var socket = io.connect('http://localhost:8080');
var last_data=0;
var color =d3.scale.category20b(); 

var n = 1000,
    random = d3.random.normal(250, 0),
    data = d3.range(n).map(random);
 
var margin = {top: 10, right: 10, bottom: 20, left: 30},
    width = 560 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;
 
var x = d3.scale.linear()
    .domain([0, n - 1])
    .range([0, width]);
 
var y = d3.scale.linear()
    .domain([-350, 350])
    .range([height, 0]);
 
var line = d3.svg.line()
    .x(function(d, i) { return x(i); })
    .y(function(d, i) { return y(d); });

 
var svg = d3.select("graphs").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
 
svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);
 
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.svg.axis().scale(x).orient("bottom"));
 
svg.append("g")
    .attr("class", "y axis")
    .call(d3.svg.axis().scale(y).orient("left"));
 
var path = svg.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .data([data])
    .attr("class", "line")
    .attr("d", line)
    .style("stroke","blue");
 
  socket.on('serialEvent', function (socket_data)
   {
    socket_data = JSON.parse(socket_data.value.replace(/ /g,""));
    // push a new data point onto the back
    data.push(socket_data.accel.z);
    z = document.getElementById("z");
    z.innerHTML = data.accel.z;
   
  // redraw the line, and slide it to the left
  path
      .attr("d", line)
      .attr("transform", null)
      .transition()
      .duration(500)
      .ease("linear")
      .attr("transform", "translate(" + x(-1) + ")")
      .each("end", false);
      
 
  // pop the old data point off the front
  data.shift();
    
    });
 
