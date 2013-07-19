
var whatTheUserWant = ['x', 'y', 'z'];
var color = ["green","red","blue  ","#b0d02e", "#e94366", "#51a5cb","#f08f33","#333333","#777777"];
                                 
var margin = {top: 10, right: 10, bottom: 100, left: 40},
    margin2 = {top: 430, right: 10, bottom: 20, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    height2 = 500 - margin2.top - margin2.bottom;

var parseDate = d3.time.format("%Y-%m-%dT%H:%M:%S.%LZ").parse;

var x = d3.time.scale().range([0, width]),
    x2 = d3.time.scale().range([0, width]),
    y = d3.scale.linear().range([height, 0]),
    y2 = d3.scale.linear().range([height2, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom"),
    xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
    yAxis = d3.svg.axis().scale(y).orient("left");

var brush = d3.svg.brush()
    .x(x2)
    .on("brush", brush);



var area = function (color) {
    return d3.svg.area()
        .interpolate("monotone")
        .x(function (d) {
          return x(d.date);
        })
        .y0(height)
        .y1(function (d) {
          return y(d[color]);
        });
};



    var area2 = function (color) {
        return d3.svg.area()
            .interpolate("monotone")
            .x(function (d) {
            return x2(d.date);
        })
            .y0(height2)
            .y1(function (d) {
            return y2(d[color]);
        });
    };
var graphs = document.getElementById("graphs");
graphs.innerHTML="";

var svg = d3.select("graphs").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

svg.append("defs").append("clipPath")
    .attr("id", "clip")
  .append("rect")
    .attr("width", width)
    .attr("height", height);

var focus = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var context = svg.append("g")
    .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
var dd;


d3.json("../data.json", function(error, data) {
    dd=data;
    
    data.forEach(function(d) {
    
    d.date = parseDate(d.date);
    d.y = +d.y
    d.x = +d.x;
    d.z = +d.z;
  });

  x.domain(d3.extent(data.map(function(d) { return d.date; })));
  y.domain([-600,600]);
  x2.domain(x.domain());
  y2.domain([-500,500]);

  focus.selectAll('path')
      .data(whatTheUserWant)
      .enter()
      .append('path')
      .attr('clip-path', 'url(#clip)')
      .attr('d', function (col) {
        return area(col)(data);
      })
      .attr('class', function (col) {
        return "path_" + col + " data";
      })
      .attr('id', function (d) {
        return "path_" + d ;
      });


  
  focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  focus.append("g")
      .attr("class", "y axis")
      .call(yAxis);

   context.selectAll('path')
        .data(whatTheUserWant)
        .enter()
        .append('path')
        .attr('d', function (col) {
          return area2(col)(data);
        })
        .attr('class', function (col) {
          return "path_" + col;
        })
        .attr('id', function (d) {
        return "path_" + d;
        });


  context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height2 + ")")
      .call(xAxis2);

  context.append("g")
      .attr("class", "x brush")
      .call(brush)
    .selectAll("rect")
      .attr("y", -6)
      .attr("height", height2 + 7);
});

 function brush() {
        x.domain(brush.empty() ? x2.domain() : brush.extent());
        focus.selectAll("path").attr("d", function (col) { return area(col)(dd); });
        focus.select(".x.axis").call(xAxis);
    }

    

  var check = new Array();
  check[0] = document.getElementById("X");
  check[1] = document.getElementById("Y");
  check[2] = document.getElementById("Z");


function addChart()
{
  for (var i = 0; i < 3; i++) {
  
   if(check[i].checked!=true)
  {
     focus.select("path#path_"+whatTheUserWant[i])
      .transition()
      .duration(100)
      .style("stroke-opacity",0)
      .each("end", false);
    context.select("path#path_"+whatTheUserWant[i])
      .transition()
      .duration(100)
      .style("stroke-opacity",0)
      .each("end", false);

  }
  else
  {
    focus.select("path#path_"+whatTheUserWant[i])
      .transition()
      .duration(100)
      .style("stroke-opacity",1)
      .each("end", false);
    context.select("path#path_"+whatTheUserWant[i])
      .transition()
      .duration(100)
      .style("stroke-opacity",1)
      .each("end", false);

  }
  };

}
