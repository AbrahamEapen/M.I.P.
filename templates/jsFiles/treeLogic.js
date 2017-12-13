
var data =
{"Name":"Meteorite Classification",
   "children": [
  {
    "Name": "Differentiated Meteorites",
    "children": [
    {
      "Name":"Iron Meteorites",
      "children":[
      {
        "Name":"IAB",
      },
      {
        "Name":"IIAB",
      },
      {
        "Name":"IIIAB",
      },
      {
        "Name":"IVAB",
      },
      {
        "Name":"Ungr.",
      },
      {
        "Name":"Other",
      },
      ]
    },
    {
      "Name":"Stony-Iron Meteorites",
      "children":[
      {
        "Name":"Pallasites",
      },
      {
        "Name":"Mesosiderites",
      },
      ]
    },
    {
      "Name": "Achondrites",
      "children": [
        {
          "Name":"Primitive",
          "children":[
          {
            "Name":"Lodranites",
          },
          {
            "Name":"Achondrites",
          },
          {
            "Name":"Winonaites",
          },
          ]
        },
        {
          "Name":"Martin",
          "children":[
            {
              "Name":"Shergottites",
            },
            {
              "Name":"Nakhlites",
            },
            {
              "Name":"Chassignites",
            },
            {
              "Name":"ALH 84001 opx",
            },
          ]
        },
        {
          "Name":"Aubrites"
        },
        {
          "Name":"Ureilites"
        },
        {
          "Name":"HED",
          "children":[
            {
              "Name":"Eucrites",
            },
            {
              "Name":"Diogenities",
            },
            {
              "Name":"Howardites"
            },
          ]
        },
        {
          "Name":"Angrites"
        },
        {
          "Name":"Brachinites"
        },
        {
          "Name":"Lunar",
          "children":[
            {
              "Name":"Feldspathic Breccias",
            },
            {
              "Name":"Basaltic",
            },
            {
              "Name":"Polymict",
            }
          ]
        }
      ]
    },
   ]
 },
 {
    "Name": "Chondrites",
    "children": [
      {
        "Name": "Carbonaceous",
        "children": [
          {
            "Name": "CB",
          },
          {
            "Name": "CH",
          },
          {
            "Name": "CK",
          },
          {
            "Name": "CM",
          },
          {
            "Name": "CR",
          },
          {
            "Name": "CV",
          },
          {
            "Name": "CO",
          },
          {
            "Name": "CI",
          }
        ]
      },
      {
        "Name": "Ordinary",
        "children":[
          {
            "Name":"H"
          },
          {
            "Name":"L"
          },
          {
            "Name":"LL"
          }
        ]
      },
      {
        "Name": "Rumuruti(R)",
      },
      {
        "Name": "Enstatite",
        "children":[
          {
            "Name":"EH",
          },
          {
            "Name":"EL",
          }
        ]
      }
    ]
  }
  ]
}

var clusterLayout = d3.cluster()
  .size([400, 200])

var root = d3.hierarchy(data)

clusterLayout(root)



// Nodes
d3.select('svg g.nodes')
  .selectAll('circle.node')
  .data(root.descendants())
  .enter()
  .append('circle')
  .classed('node', true)
  .attr('cx', function(d) {return d.x;})
  .attr('cy', function(d) {return d.y;})
  .attr('r', 4)
  .text(function(d) { return d.children ? null : d.name})
  //.attr("transform", "rotate(" + (360) + ")")
  //.transition().duration(1000).delay(2000)
  //.style("transform", "skewY(15deg)") 

  
// Links
d3.select('svg g.links')
  .selectAll('line.link')
  .data(root.links())
  .enter()
  .append('line')
  .classed('link', true)
  .attr('x1', function(d) {return d.source.x;})
  .attr('y1', function(d) {return d.source.y;})
  .attr('x2', function(d) {return d.target.x;})
  .attr('y2', function(d) {return d.target.y;})
  // .attr("transform", "rotate(" + (90) + ")")
  // .transition().duration(1000).delay(2000)
  // .style("transform", "skewY(15deg)") 

