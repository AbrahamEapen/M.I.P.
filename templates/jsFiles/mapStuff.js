 var svg = d3.select("svg"),
 //width = +svg.attr("width"),
 //height = +svg.attr("height");

// set the dimensions of the canvas
//var margin = {top: 20, right: 20, bottom: 70, left: 40},
width = 1200// - margin.left - margin.right,
height = 960// - margin.top - margin.bottom;

var projection = d3.geoMercator()

var path = d3.geoPath()
.projection(projection);

var graticule = d3.geoGraticule();

d3.json("https://unpkg.com/world-atlas@1/world/50m.json", function(error, world) {
if (error) throw error;

projection
    .scale((width - 3) / (5 * Math.PI))
    .translate([width / 4, height / 3])

svg.insert("path", ".graticule")
    .datum(topojson.feature(world, world.objects.land))
    .attr("class", "land")
    .attr("d", path)  
   // .transition().duration(1000).delay(2000)
    //.style("transform", "skewY(-15deg)") ;
   
//Load in meteorite json
var queryUrl = "https://raw.githubusercontent.com/AbrahamEapen/Meteorite-Market/master/templates/meteorites.json"

var rectangleData = [
    
    { "rx": 500, "ry": 310, "height": 30, "width": 90, "color" : "red" }];
    
var rectangles = svg.selectAll("rect")
                           .data(rectangleData)
                           .enter()
                           .append("rect")
                           .style("opacity", 100)
                           .on("click", function(d) {
                            start()
                            })
                            .transition()
                            .duration(1000)
                            .style("opacity", 100)
                           // .attr("transform", "rotate(" + (360) + ")");

var rectangleAttributes = rectangles
                         .attr("x", 800)
                        .attr("y", 200)
                         .attr("height", 80)
                        .attr("width", 100)
                         .style("fill", function(d) { return d.color; });

                        //tooltip data
                        /////////////
                        /////////////
                        //  var toolTip = d3.tip()
                        //  .attr("class", "tooltip")
                        //  .offset([80, -60])
                        //  .html(function(data) {
                        //  var state = data.state;})
                            
//animation function
function start()
{
d3.json(queryUrl, function(error, data) {
    console.log(data)

    //Rectangle is bound and will make into a bar chart?
    svg.selectAll("rect").data(rectangleData)
        .transition()
        .duration(2000)
        //.delay(1000)
        .attr("x", 175)
        .attr("y", 700)
        .attr("height", 180)
        .attr("width", 550)
        .style("fill", "#222")
        .style("transform", "skewX(75deg)")
        .style("transform", "skewY(-15deg)")

    svg.selectAll("circle")
        .data(data)

        .enter()
        .append("circle") .on("mouseover", function(data) {
            toolTip.show(data);
            toolTip.style("display", null);
          })
          // onmouseout event
          .on("mouseout", function(data, index) {
            toolTip.hide(data);
            toolTip.style("display", "none");
          })
          .style("opacity", 0.75)

        //transition - origin point of the circle
        //.attr("cy", 0)
        .style("fill: ", "#4682b4")
        .style("transform", "skewY(15deg)")
        .transition()
        .duration(1000)
        //height of where the circle animation strarts
        .attr("cy", 25)
        .attr("opacity", 0)
        .transition()

     //   .duration(1000)
       // .delay(1000)
        //end transition

        //transition - origin point of the circle
        .attr("cx", 870)
        .attr("r", 4)
        .transition()
        .delay(function(d, i) {
            console.log(i)
            return i * 1000;
        })
        //this easement is what governs the smoothness of the animation.... can also use "cubic-in-out", "elastic"
        //.ease("elastic")
        .attr("r", 3)

        .style("fill", "red")

        .delay(function(d, i) {
            return 200 + parseInt(d.id);
        })
        .duration(2300)
     

        .attr("cy", function(d, i) {
            try {
                return (projection(d.geolocation.coordinates)[1]);
            } catch (err) {
                console.log("json entry missing long and lat")
            }
        })

        //end transition
        .attr("cx", function(d, i) {

            try {
               
                return projection(d.geolocation.coordinates)[0];

            } catch (err) {
                console.log("json entry missing long and lat")
            }
        }).style("transform", "skewY(-15deg)")
        .transition()

        //this code highlights the impact zone
        .attr('r', function(d, i) {
            try {
                //console.log(d.mass);
                //console.log("We made it to the " + i + " index")

                
                    //console.log(Math.sqrt(parseInt(d.mass)));
                    return (Math.sqrt(parseInt(d.mass)/100))


            } catch (err) {
                console.log("oh snap, error in radius expansion animation")
            }
        })
        .style("opacity", 0.9)
        .text(function(d, i) {
            return d.name
        })
        .duration(500)
        //return circles to the original size
        .transition()
        .duration(300)
        .attr('r', 3)
        .transition()
        //end of code highlighting impact zone

        .duration(function(d, i) {
            return 3000 + parseInt(d.id);
        })
        .attr("r", 3)
        .style("opacity", 0.5)
        .delay(function(d, i) {
            return 5000 + parseInt(d.id);
        })

        //animation of the links on the tree
        svg.select('svg g.links')
        .selectAll('line.link') 
        //.attr("transform", "rotate(" + (90) + ")")
        .transition()
        .duration(2000)
       // .delay(1000)
        .style("transform", "skewY(15deg)") 

        //animation of the node movements
        svg.select('svg g.nodes')
        .selectAll('circle.node')
        .transition()
        .duration(2000)
      //  .delay(1000)
        .style("transform", "skewY(15deg)") 

        d3.selectAll("path")
        .transition()
        .duration(2000)
       // .delay(1000)
        .style("transform", "skewY(-15deg)") ;

       
 


});
}});
