var svg1 = d3.select("#budget"),
    margin = {top: 50, right: 0, bottom: 50, left: 50},
    width = +svg1.attr("width") - margin.left - margin.right,
    height = +svg1.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);
    
var tool_tip = d3.tip()
  .attr("class", "d3-tip")
  .offset([-8, 0])
  .html(function(d) { return d.frequency + " billion"; });

svg1.call(tool_tip);

var g = svg1.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("budget.tsv", function(d) {
  d.frequency = +d.frequency;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
      
  g.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y));
      
  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("y", function(d) { return y(d.frequency); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) { return height - y(d.frequency); })
      .on('mouseover', tool_tip.show)
      .on('mouseout', tool_tip.hide);
});