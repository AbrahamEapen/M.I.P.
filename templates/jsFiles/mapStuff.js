var svg = d3.select("land")
.append("svg")
.attr("width", "100%")
.attr("height", "100%")
.call(d3.zoom().on("zoom", function () {
   svg.attr("transform", d3.event.transform)
}))
.append("g")
 
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
    
    
 

   
   
//Load in meteorite json
var queryUrl = "https://raw.githubusercontent.com/AbrahamEapen/Meteorite-Market/master/templates/meteorites.json"

var rectangleData = [
    
    { "rx": 200, "ry": 310, "height": 30, "width": 90, "color" : "red" }];
    
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
                         .attr("x", 150)
                        .attr("y", 150)
                         .attr("height", 80)
                        .attr("width", 100)
                         .style("fill", "green" );

                //Text for the start button
                svg.append("text")
                         .attr("x", 100)             
                         .attr("y", 100)
                         .attr("text-anchor", "middle")  
                         .style("font-size", "16px") 
                         .style("text-decoration", "underline")  
                         .text("Click to Start")
                         .transition()
                         .attr("x", 200)             
                         .attr("y",200)
                         .duration(2000)
                         
                         .transition()
                         .delay(2000)
                         .style("opacity", 0)
                         .duration(1000)

                        
                         

                         
                            





                       

 //animation function
function start()
{

d3.json(queryUrl, function(error, data) {
    console.log(data)
   

    //Rectangle is bound and will make into a bar chart?
    svg.selectAll("rect")
        .data(rectangleData)
        .transition()
        .duration(1000)
        //.delay(1000)
        .attr("x", 1875)
        .attr("y", 700)
        .attr("height", 50)
        .attr("width", 50)
        .style("fill", "#222")
        .style("transform", "skewX(-75deg)")
        .style("transform", "skewY(-15deg)")
        .remove()


    var circleGroup = svg.append("g");

  

    var circleGroup = circleGroup.selectAll("circle")
        .data(data)
        .text(function(d) { return data.id; })
        .attr("class","label")
        //.append("g")
        .enter()
        .append("circle") 
        // .on("mouseover", function(d, i) {
        //     d3.select(this)
        //     .attr("fill", "orange")
        //         //,
        //         //r: r * 2
            
        //   })
        //   // onmouseout event
        //   .on("mouseout", function(d, i) {
        //  // Use D3 to select element, change color back to normal
        //  d3.select(this).attr("fill", "red");

        //  // Select text by id and then remove
        // // d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
        
        //   })
          .style("opacity", 0.75)

        //transition - origin point of the circle
        //.attr("cy", 0)
        .style("fill: ", "#4682b4")
        .style("transform", "skewY(15deg)")
        .transition()
        .duration(1000)
        //height of where the circle animation strarts
        
        .attr("opacity", 0)
        .transition()

     //   .duration(1000)
       // .delay(1000)
        //end transition

        //transition - origin point of the circle
    //    svg.selectAll("circle")
        .attr("cx", 846).attr("cy", -110)
        .attr("r", 4)
        .transition()
        .delay(function(d, i) {
            //console.log(i)
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
        }).attr("class","label")
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
        .attr("r", function(d, i) {
            try {
                //console.log(d.mass);
                //console.log("We made it to the " + i + " index")

                
                    //console.log(Math.sqrt(parseInt(d.mass)));
                    return (Math.sqrt(Math.sqrt(parseInt(d.mass)/100)))


            } catch (err) {
                console.log("oh snap, error in radius expansion animation")
            }
        })
        .style("opacity", 0.5)
        .style("stroke", "#222")
        .style("stroke-width", "1px")

       
        .delay(function(d, i) {
            return 5000 + parseInt(d.id);
        });
///////////////////////////////////////////////////
///////////////////////////////////////////////////
        d3.selectAll('circle')
        .on('mouseover', function(d, i) {
          d3.select('.status')
            .text('Meteorite ' + d.name + " has a classification of " + d.recclass + " and a mass of " + d.mass);
        });

        ///////////////////////////////////////////////////
        
        
        
      

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
        .on("mouseover", function(d, i) {
            d3.select(this)
            .attr("fill", "orange")
                //,
                //r: r * 2
            
          })
          // onmouseout event
          .on("mouseout", function(d, i) {
         // Use D3 to select element, change color back to normal
              d3.select(this)
             .attr("fill", "red");

         // Select text by id and then remove
        // d3.select("#t" + d.x + "-" + d.y + "-" + i).remove();  // Remove text location
        
          })
        .transition()
        .duration(2000)
      //  .delay(1000)
        .style("transform", "skewY(15deg)"); 
         //////////////////////
        //Tooltips
        //////////////////////
    

        //Animation of the maps for skewing
        d3.selectAll("path")
        .transition()
        .duration(2000)
       // .delay(1000)
        .style("transform", "skewY(-15deg)") ;


        //Title for the tree map
        svg.append("text")
        .attr("x", 125)             
        .attr("y",25)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Meteorite Classifications")
        .transition()
        .attr("x", 825)             
        .attr("y",280)
        .duration(2000)
        .style("transform", "skewY(15deg)");

        //Title for the map
        svg.append("text")
        .attr("x", 125)             
        .attr("y",25)
        .attr("text-anchor", "middle")  
        .style("font-size", "16px") 
        .style("text-decoration", "underline")  
        .text("Locations of Strikes")
        .transition()
        .attr("x", 325)             
        .attr("y",580)
        .duration(2000)
        .style("transform", "skewY(-15deg)");


          //Our Names
          svg.append("text")
          .attr("x", 750)             
          .attr("y",25)
          .attr("text-anchor", "middle")  
          .style("font-size", "16px") 
          .style("text-decoration", "underline")  
          .text("Jeff, Abe, Harshil, Amitabha")
          
          .transition()
          .attr("x", 925)             
          .attr("y",350)
          .duration(2000)

          
          
         // .transition()
          .style("transform", "skewY(15deg)");



       
       
 


})
}});

