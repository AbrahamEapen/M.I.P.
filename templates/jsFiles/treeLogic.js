var data = {
  "Name": "Root",
  "children": [{
          "Name": "Differentiated Meteorites",
          "children": [{
                  "Name": "Iron Meteorites",
                  "children": [{
                          "Name": "IAB"
                      },
                      {
                          "Name": "IIAB"
                      },
                      {
                          "Name": "IIIAB"
                      },
                      {
                          "Name": "IVAB"
                      },
                      {
                          "Name": "Ungr."
                      },
                      {
                          "Name": "Other"
                      }
                  ]
              },
              {
                  "Name": "Stony-Iron Meteorites",
                  "children": [{
                          "Name": "Pallasites"
                      },
                      {
                          "Name": "Mesosiderites"
                      },
                  ]
              },
              {
                  "Name": "Achondrites",
                  "children": [{
                          "Name": "Primitive",
                          "children": [{
                                  "Name": "Lodranites"
                              },
                              {
                                  "Name": "Achondrites"
                              },
                              {
                                  "Name": "Winonaites"
                              }
                          ]
                      },
                      {
                          "Name": "Martin",
                          "children": [{
                                  "Name": "Shergottites"
                              },
                              {
                                  "Name": "Nakhlites"
                              },
                              {
                                  "Name": "Chassignites"
                              },
                              {
                                  "Name": "ALH 84001 opx"
                              }
                          ]
                      },
                      {
                          "Name": "Aubrites"
                      },
                      {
                          "Name": "Ureilites"
                      },
                      {
                          "Name": "HED",
                          "children": [{
                                  "Name": "Eucrites"
                              },
                              {
                                  "Name": "Diogenities"
                              },
                              {
                                  "Name": "Howardites"
                              }
                          ]
                      },
                      {
                          "Name": "Angrites"
                      },
                      {
                          "Name": "Brachinites"
                      },
                      {
                          "Name": "Lunar",
                          "children": [{
                                  "Name": "Feldspathic Breccias"
                              },
                              {
                                  "Name": "Basaltic"
                              },
                              {
                                  "Name": "Polymict"
                              }
                          ]
                      }
                  ]
              }
          ]
      },
      {
          "Name": "Chondrites",
          "children": [{
                  "Name": "Carbonaceous",
                  "children": [{
                          "Name": "CB"
                      },
                      {
                          "Name": "CH"
                      },
                      {
                          "Name": "CK"
                      },
                      {
                          "Name": "CM"
                      },
                      {
                          "Name": "CR"
                      },
                      {
                          "Name": "CV"
                      },
                      {
                          "Name": "CO"
                      },
                      {
                          "Name": "CI"
                      }
                  ]
              },
              {
                  "Name": "Ordinary",
                  "children": [{
                          "Name": "H"
                      },
                      {
                          "Name": "L"
                      },
                      {
                          "Name": "LL"
                      }
                  ]
              },
              {
                  "Name": "Rumuruti(R)",
              },
              {
                  "Name": "Enstatite",
                  "children": [{
                          "Name": "EH"
                      },
                      {
                          "Name": "EL"
                      }
                  ]
              }
          ]
      }
  ]
}


// Create a SVG Canvas
var clusterLayout = d3.cluster()
  .size([400, 300])

var root = d3.hierarchy(data)

var color = d3.scaleOrdinal(d3.schemeCategory20);

var tooltip = d3.select("body")
  .append("div")
  .attr("class", "toolTip");

clusterLayout(root)

// Nodes
d3.select('svg g.nodes')
  .selectAll('circle.node')
  .data(root.descendants(data))
  .enter()
  .append('circle')
  .classed('node', true)
  .attr('cx', function(d) {
      return d.x;
  })
  .attr('cy', function(d) {
      return d.y;
  })
  .attr('r', 4)
  .on("mousemove", function(d) {
      tooltip
          .style("left", d3.event.pageX - 50 + "px")
          .style("top", d3.event.pageY - 70 + "px")
          .style("display", "inline-block")
          .html(d.Name);
  })
  .on("mouseout", function(d) {
      tooltip.style("display", "none");
  });

// Links
d3.select('svg g.links')
  .selectAll('line.link')
  .data(root.links(data))
  .enter()
  .append('line')
  .classed('link', true)
  .attr('x1', function(d) {
      return d.source.x;
  })
  .attr('y1', function(d) {
      return d.source.y;
  })
  .attr('x2', function(d) {
      return d.target.x;
  })
  .attr('y2', function(d) {
      return d.target.y;
  });