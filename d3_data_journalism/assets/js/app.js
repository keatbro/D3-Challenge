// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 700 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Grab data with d3
d3.csv("assets/data/data.csv").then(function(data) {
    // Log entry to see what data looks like
    console.log(data[0]);

    // Add X Axis
    var x = d3.scaleLinear()
        .domain([30000, 80000])
        .range([0, width]);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // Add Y Axis
    var y = d3.scaleLinear()
        .domain([0,50])
        .range([height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));


    // Add dots
    svg.append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function (d) {return x(d.income); })
            .attr("cy", function (d) {return y(d.obesity); })
            .attr("r", 10)
            // .style("fill", "#90EE90")

    // Create X Axis Label        
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width  * .5)
        .attr("y", height + 30)
        .text("Income")

    // Create Y Axis Label 
    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", 5)
        .attr("dy", -40)
        .attr("transform", "rotate(-90)")
        .text("% Obesity")
        
});



