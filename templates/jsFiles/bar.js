// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 40},
width = 1260 - margin.left - margin.right,
height = 800 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
      .range([0, width])
      .padding(0.2);
var y = d3.scaleLinear()
      .range([height, 0]);
      
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", 
      "translate(" + margin.left + "," + margin.top + ")");

// get the data
d3.csv("https://raw.githubusercontent.com/AbrahamEapen/Meteorite-Market/master/recclassMass.csv", function(error, data) {
if (error) throw error;

// format the data
data.forEach(function(d) {
d.Final = +d.Final;
console.log(d.Recclass, d.Final);

});

// Scale the range of the data in the domains
x.domain(data.map(function(d, i) { 
    return d.Recclass; }));
y.domain([0, d3.max(data, function(d, i) { return d.Final; })]);

// append the rectangles for the bar chart
svg.selectAll(".bar")
  .data(data)
.enter().append("rect")
  .attr("class", "bar")
  .attr("x", function(d, i) { return x(d.Recclass); })
  .attr("width", x.bandwidth())
  .attr("y", function(d, i) { return y(d.Final); })
  .attr("height", function(d) { return height - y(d.Final); });

// add the x Axis
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// add the y Axis
svg.append("g")
  .call(d3.axisLeft(y));

});