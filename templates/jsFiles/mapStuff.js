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

// svg.append("defs").append("path")
// .datum({
//     type: "Sphere"
// })
// .attr("id", "sphere")
// .attr("d", path);

// svg.append("use")
// .attr("class", "stroke")
// .attr("xlink:href", "#sphere");

// svg.append("use")
// .attr("class", "fill")
// .attr("xlink:href", "#sphere");

// svg.append("path")
// .datum(graticule)
// .attr("class", "graticule")
// .attr("d", path);

d3.json("https://unpkg.com/world-atlas@1/world/50m.json", function(error, world) {
if (error) throw error;

projection
    .scale((width - 3) / (5 * Math.PI))
    .translate([width / 4, height / 3])
  
    

svg.insert("path", ".graticule")
    .datum(topojson.feature(world, world.objects.land))
    .attr("class", "land")
    .attr("d", path);
    

//  svg.insert("path", ".graticule")
//      .datum(topojson.mesh(world, world.objects.countries, function(a, b) {
//          return a !== b;
//      }))
//     .attr("class", "boundary")
//      .attr("d", path);

//Load in meteorite json
var queryUrl = "https://raw.githubusercontent.com/AbrahamEapen/Meteorite-Market/master/templates/meteorites.json"


var rectangleData = [
    { "rx": 600, "ry": 110, "height": 30, "width": 90, "color" : "green" }];
    

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
                            .attr("transform", "rotate(" + (5) + ")");

var rectangleAttributes = rectangles
                         .attr("x", function (d) { return d.rx; })
                        .attr("y", function (d) { return d.ry; })
                         .attr("height", function (d) { return d.height; })
                        .attr("width", function (d) { return d.width; })
                         .style("fill", function(d) { return d.color; });

//animation function
function start()
{
d3.json(queryUrl, function(error, data) {
    console.log(data)

    //Path
    svg.append("path")
        .data(data)
        .attr("class", "line")
        .attr("d", "M 0 0, l 0 0")
        .attr("fill", "none")
        .attr("stroke", "black");

       







    svg.selectAll("circle")
        .data(data)

        .enter()
        .append("circle")


        //   

        .style("stroke", "gray")
        .style("stroke-width", 0.25)
        .style("opacity", 0.75)

        //transition - origin point of the circle
        .attr("cy", 0)

        .style("fill", "yellow")
        .transition()
        .duration(1000)
        .attr("cy", 200)
        .transition()

        .duration(1000)
        .delay(1000)

        //end transition

        //transition - origin point of the circle
        .attr("cx", 900)
        .attr("r", 2)
        .transition()
        .delay(function(d, i) {
            return i * 50;
        })
        //this easement is what governs the smoothness of the animation.... can also use "cubic-in-out", "elastic"
        //.ease("Exp")
        .attr("r", 3)

        .style("fill", "red")

        .delay(function(d, i) {
            return 1000 + parseInt(d.id);
        })
        .duration(3000)
     

        .attr("cy", function(d, i) {

            try {
                //         console.log(d);
                //     console.log("We made it to the " + i + " index")
                // console.log(projection(d.geolocation.coordinates)[1]);
                return (projection(d.geolocation.coordinates)[1]);
            } catch (err) {
                console.log("json entry missing long and lat")
            }
        })



        //end transition
        .attr("cx", function(d, i) {

            try {
                //     console.log(d);
                //    console.log(projection(d.geolocation.coordinates)[0]);
                return projection(d.geolocation.coordinates)[0];

            } catch (err) {
                console.log("json entry missing long and lat")
            }
        })
        .transition()

        //this code highlights the impact zone

        .attr('r', function(d, i) {
            try {
                //console.log(d.mass);
                //console.log("We made it to the " + i + " index")

                
                    //console.log(Math.sqrt(parseInt(d.mass)));
                    return Math.sqrt(Math.sqrt(parseInt(d.mass)))

               
                 
                

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
        .duration(500)
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
    //.remove()




    //    .append("title")			//Simple tooltip
    //    .text(function(d) {
    //  console.log(geolocation.coordinates)
    //return d.fall + ": fall. " + (d.mass);
    //   }


});
}});
