//Load in meteorite json
var queryUrl = "https://raw.githubusercontent.com/AbrahamEapen/Meteorite-Market/master/templates/meteorites.json"



    

   

					d3.json(queryUrl, function(error, data) {
                        console.log(data)
                        
                    //Path
                     svg.append("path")
                    .data(data)
                     .attr("class", "line")
                     .attr("d", "M 0 0, l 0 0")
                     .attr("fill","none")
                    .attr("stroke","black");



                    // Set up the reset button to move it back to 50,50
d3.select("#reset").on("click", function() {
	rectangle
		.transition()
		.attr("x", 50)
		.attr("y", 50);
});

d3.select("#start").on("click", function() {
	rectangle
		.transition(); // ALL OF OUR TRANSITIONS WILL GO HERE!
});

                    


                    


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
                           .attr("cx", 400)
                           .attr("r", 2)
                           .transition()
                           .delay(function(d, i) { return i * 50; })
                           //this easement is what governs the smoothness of the animation.... can also use "cubic-in-out", "elastic"
                           .ease("Exp")
                           .attr("r", 3)
                           
                           .style("fill", "red")
                           
                           .delay(function(d, i) { return 1000 + parseInt(d.id); })
                           .duration(3000)
                        //        for(x = 1; x < data.length; x++)
                        //    {
                        //            yArr = [];
                        //            yArr.push(100 + parseInt(data.id));
                        //            console.log(data.id);
                        //            console.log(yArr);
                        //            return yArr;

                        //        }
                             
                         //   }
                       // )
                           
                           .attr("cy", function(d, i)
                           	{
                                
                                try{
                                //         console.log(d);
                                //     console.log("We made it to the " + i + " index")
                                // console.log(projection(d.geolocation.coordinates)[1]);
                                return projection(d.geolocation.coordinates)[1];
                                }
                                catch(err){
                                    console.log("json entry missing long and lat")
                                }
                           })
                           
                        
                           
                           //end transition
                           .attr("cx", function(d){

                            try{
                            //     console.log(d);
                            //    console.log(projection(d.geolocation.coordinates)[0]);
                               return projection(d.geolocation.coordinates)[0];

                            }
                            catch(err){
                                console.log("json entry missing long and lat")
                            }
                           })
                           .transition()

                           //this code highlights the impact zone
                           
                           .attr('r', function(d, i){
                             try{
                                     //console.log(d.mass);
                                     console.log("We made it to the " + i + " index")

                                 if (parseInt(d.mass) > 1000000){
                                    console.log(Math.sqrt(parseInt(d.mass)));
                                    return Math.sqrt(Math.sqrt(parseInt(d.mass)))

                                 }
                                 else {  //taking the sqrt of the sqrt 
                                    //console.log(Math.sqrt(parseInt(d.mass)));
                                    return Math.sqrt(Math.sqrt(parseInt(d.mass)))
                                    //console.log(parseInt(d.mass / 10000));
                                    
                                     //return parseInt(d.mass / 10000);
                                 }

                             }
                                 catch(err){
                                     console.log("suck it")
                                 }
                          })
                           .style("opacity", 0.9)
                           .duration(500)
                           //return circles to the original size
                           .transition()
                           .duration(500)
                           .attr('r', 3)
                           .transition()
                           //end of code highlighting impact zone

                           .duration(function(d, i) { return 3000 + parseInt(d.id); })
                           .attr("r", 3)
                           .style("opacity", 0.5)
                           .delay(function(d, i) { return 5000 + parseInt(d.id); })
                           //.remove()
                           
                           



						//    .append("title")			//Simple tooltip
						//    .text(function(d) {
                             //  console.log(geolocation.coordinates)
								//return d.fall + ": fall. " + (d.mass);
                        //   }
                    
						
					});
});