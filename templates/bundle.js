// margin for the graph
var margin = {top: 10, bottom: 10, left: 10, right: 10},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// legend
var legend = ['part1', 'part2', 'part3'];

// color scale
var color = d3.scaleOrdinal().range(['#fdb462', '#ffffb3', '#80b1d3']).domain(legend);

// define tree map
var tree = d3.treemap()
    .size([width, height])
    .padding(1)
    .round(true);


//Load in meteorite json
var queryUrl = "https://raw.githubusercontent.com/AbrahamEapen/Meteorite-Market/master/templates/meteorites.json"



// data
d3.json(queryUrl, function(error, data) {
    console.log(data)
 

    data.forEach(function (d) {
        d.value = +d.value1;
        d.value2 = +d.value2;

    });

    // create a tree like object
    var root = stratifyData(data);
    tree(root);

    // select the top div
    var topNode = d3.select('#viz');

    // create all the blocks
    var node = topNode.selectAll('.node')
        .data(root.leaves(), function (d) {
        try { 
               return d.data.name
        }  catch (err) {
            console.log("error")
        }
        })
        .enter().append('div')
        .attr('class', 'node');

    // append label
    var nodeLabel = node.append("div")
        .attr("class", "node-label");

    // append label
    var nodeValue = node.append("div")
        .attr("class", "node-value");

    // define positions
    node.call(position);


});


// change data structure into a node tree which
// can be used by the treemap
function stratifyData(data) {

    console.log(data);

    var stratif = d3.stratify()

        .id(function (d) {
            return d.name
        })
        .massId(function (d) {
            return d.mass;
        });

    return stratif(data).sum(function (d) {
        return d.value;
    }).sort(function (a, b) {
        return b.height - a.height || b.value - a.value;
    });


}

// update the position of a block
function position(d) {

    d
        .attr("title", function (d) {
            return d.id + "\n" + (d.value);
        })
        .style('left', function (d) {
            return d.x0 + 'px';
        })
        .style('top', function (d) {

            return d.y0 + 'px';
        })
        .style('width', function (d) {
            return d.x1 - d.x0 + 'px';
        })
        .style('height', function (d) {
            return d.y1 - d.y0 + 'px';
        })
        .style('background', function (d, i) {
            return !d.children ? color(d.parent.data.name) : null;
        });


    d.select('.node-label')
        .text(function (d) {
            return (d.data.name);
        });

    d.select('.node-value').text(function (d) {
        return (d.data.value);
    });


}


// create legend
var svg = d3.select('#viz')
    .append('svg')
    .attr('width', width + 200)
    .attr('height', height).append('g')
    .attr('class', 'legend')
    .attr('transform', 'translate(' + width + ', ' + 30 + ')');

// legend title
svg.append('text')
    .style('font-weight', 'bold')
    .attr('x', 10)
    .attr('y', -10)
    .text('Legend');


// create g for each legend item
var legendItem = svg.selectAll('.legend-item')
    .data(legend).enter()
    .append('g')
    .attr('class', 'legend-item')
    .attr('transform', function (d, i) {
        return 'translate(10,' + i * 25 + ')'
    });

// legend rectangle
legendItem.append('rect')
    .attr('width', 20)
    .attr('height', 20)
    .style('fill', function (d) {
        return color(d)
    });

// legend text
legendItem.append('text')
    .attr('x', 25)
    .attr('y', 15).text(function (d) {
    return d;
});