
var units = "Funds";

var margin = {top: 20, right: 300, bottom: 20, left: 20},
    width = 1800 - margin.left - margin.right,
    height = 1000 - margin.top - margin.bottom;

var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return "$ " + formatNumber(d) + " " + units; },
    color = d3.scale.category10();

// append the svg canvas to the page
var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(36)
    .nodePadding(15)
    .size([width, height])
	//.align('justify'); // Gabe - added for alignment

var path = sankey.link();


// load the data (using the timelyportfolio csv method)
d3.csv("sankey3.csv", function(error, data) {

  //set up graph in same style as original example but empty
  graph = {"nodes" : [], "links" : []};

    data.forEach(function (d) {
      graph.nodes.push({ "name": d.source, "colorNode": d.nodeColorTarget, "colorLine": d.lineColorTarget  });
      graph.nodes.push({ "name": d.target, "colorNode": d.nodeColorTarget, "colorLine": d.lineColorTarget });
      graph.links.push({ "source": d.source, "target": d.target, "value": +d.value,"colorNode": d.nodeColorTarget, "colorLine": d.lineColorTarget});
     });

	
	
     // return only the distinct / unique nodes - Color Problem was below here
     graph.nodesName = d3.keys(d3.nest()
       .key(function (d) {  return d.name; })
       .map(graph.nodes));

     // loop through each link replacing the text with its index from node
     graph.links.forEach(function (d, i) {
       graph.links[i].source = graph.nodesName.indexOf(graph.links[i].source);
       graph.links[i].target = graph.nodesName.indexOf(graph.links[i].target);
     });
     
     var cloneOfNode = JSON.parse(JSON.stringify(graph.nodes));

     graph.nodesName.forEach(function (d, i) {
       for(var j = 0; j < cloneOfNode.length; j++){
         if(cloneOfNode[j].name === graph.nodesName[i]) {
           graph.nodes[i] = cloneOfNode[j];
         }
       }
     });
     graph.nodes.length = graph.nodesName.length;

     //now loop through each nodes to make nodes an array of objects
     // rather than an array of strings
     graph.nodes.forEach(function (d, i) {
       graph.nodes[i] = { "name": d, "colorNode": d.colorNode, "colorLine": d.colorLine  };
     });
 
  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);



// add in the links
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link") 
      .attr("d", path)
  .attr("id", function(d,i){d.id = i;return "link-"+i;}) //Gabe - Makes the Highlight work!!
      .style("stroke", function(d){return d.colorLine;})//Gabe - add this to return the color of link
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
    //.sort(function(a, b) { return b.dy - a.dy; })
  
  
  ;

// add the link titles
  link.append("title")
        .text(function(d) {
        return d.source.name.name + " → " +  d.target.name.name + "\n" + format(d.value); }); //added .name to .name to fix hover

// add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
  .on("click", highlight_node_links)
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      // .on("dragstart", function() { this.parentNode.appendChild(this); })
      .on("drag", dragmove));

// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { return d.colorNode;}) // modified node color
      // .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) { 
        return d.name.name + "\n" + format(d.value); }); //added .name to d.name to fix hover

// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name.name + " - $ "+Math.round(d.value).toLocaleString('en') + ""; })
    //.filter(function(d) { return d.x < width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

// the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr("transform", 
        "translate(" + (
             d.x = Math.max(0, Math.min(width - d.dx, d3.event.x))
          ) + "," + (
                   d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
            ) + ")");
    sankey.relayout();
    link.attr("d", path);
  }
	//Highlighting of Node Path
	function highlight_node_links(node,i){

    var remainingNodes=[],
        nextNodes=[];

    var stroke_opacity = 0;
    if( d3.select(this).attr("data-clicked") == "1" ){
      d3.select(this).attr("data-clicked","0");
      stroke_opacity = 0.2;
    }else{
      d3.select(this).attr("data-clicked","1");
      stroke_opacity = 0.5;
    }

    var traverse = [{
                      linkType : "sourceLinks",
                      nodeType : "target"
                    },{
                      linkType : "targetLinks",
                      nodeType : "source"
                    }];

    traverse.forEach(function(step){
      node[step.linkType].forEach(function(link) {
        remainingNodes.push(link[step.nodeType]);
        highlight_link(link.id, stroke_opacity);
      });

      while (remainingNodes.length) {
        nextNodes = [];
        remainingNodes.forEach(function(node) {
          node[step.linkType].forEach(function(link) {
            nextNodes.push(link[step.nodeType]);
            highlight_link(link.id, stroke_opacity);
          });
        });
        remainingNodes = nextNodes;
      }
    });
  }

  function highlight_link(id,opacity){
      d3.select("#link-"+id).style("stroke-opacity", opacity);
  }
	//end highlight
	
	
});
