/* global d3 */
var svg1 = d3.select("#bar1"),
    svg2 = d3.select("#bar2"),
    svg3 = d3.select("#bar3"),
    margin12 = {top: 0, right: 25, bottom: 25, left: 50},
    width12 = +svg1.attr("width") - margin12.left - margin12.right,
    height12 = +svg1.attr("height") - margin12.top - margin12.bottom,
    margin3 = {top: 0, right: 25, bottom: 25, left: 50},
    width3 = +svg3.attr("width") - margin3.left - margin3.right,
    height3 = +svg3.attr("height") - margin3.top - margin3.bottom;
    
var x12 = d3.scaleBand().rangeRound([0, width12]).padding(0.1),
    y12 = d3.scaleLinear().rangeRound([height12, 0]);
    
var x3 = d3.scaleBand().rangeRound([0, width3]).padding(0.1),
    y3 = d3.scaleLinear().rangeRound([height3, 0]);
    
var tool_tip1 = d3.tip()
  .attr("class", "d3-tip")
  .offset([-8, 0])
  .html(function(d) { return d.frequency + " billion"; });

var tool_tip2 = d3.tip()
  .attr("class", "d3-tip")
  .offset([-8, 0])
  .html(function(d) { return d.frequency + " billion"; });

var tool_tip3 = d3.tip()
  .attr("class", "d3-tip")
  .offset([-8, 0])
  .html(function(d) { return d.frequency + "%"; });

svg1.call(tool_tip1);
svg2.call(tool_tip2);
svg3.call(tool_tip3);

var g1 = svg1.append("g")
    .attr("transform", "translate(" + margin12.left + "," + margin12.top + ")");
var g2 = svg2.append("g")
    .attr("transform", "translate(" + margin12.left + "," + margin12.top + ")");
var g3 = svg3.append("g")
    .attr("transform", "translate(" + margin3.left + "," + margin3.top + ")");
    
d3.tsv("budget.tsv", function(d) {
  d.frequency = +d.frequency;
  return d;
}, function(error, data) {
  if (error) throw error;

  x12.domain(data.map(function(d) { return d.letter; }));
  y12.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  g1.append("g")
      .style("font", "12px Play")
      .style("font-weight", "bold")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height12 + ")")
      .call(d3.axisBottom(x12));
      
  g1.append("g")
      .style("font", "12px Play")
      .style("font-weight", "bold")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y12));
      
  g1.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x12(d.letter); })
      .attr("y", function(d) { return y12(d.frequency); })
      .attr("width", x12.bandwidth())
      .attr("height", function(d) { return height12 - y12(d.frequency); })
      .on('mouseover', tool_tip1.show)
      .on('mouseout', tool_tip1.hide);
});

d3.tsv("gdp.tsv", function(d) {
  d.frequency = +d.frequency;
  return d;
}, function(error, data) {
  if (error) throw error;

  x12.domain(data.map(function(d) { return d.letter; }));
  y12.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  g2.append("g")
      .style("font", "12px Play")
      .style("font-weight", "bold")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height12 + ")")
      .call(d3.axisBottom(x12));
      
  g2.append("g")
      .style("font", "12px Play")
      .style("font-weight", "bold")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y12));
      
  g2.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x12(d.letter); })
      .attr("y", function(d) { return y12(d.frequency); })
      .attr("width", x12.bandwidth())
      .attr("height", function(d) { return height12 - y12(d.frequency); })
      .on('mouseover', tool_tip2.show)
      .on('mouseout', tool_tip2.hide);
});

d3.tsv("b2gdp.tsv", function(d) {
  d.frequency = +d.frequency;
  return d;
}, function(error, data) {
  if (error) throw error;

  x3.domain(data.map(function(d) { return d.letter; }));
  y3.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  g3.append("g")
      .style("font", "18px Play")
      .style("font-weight", "bold")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height3 + ")")
      .call(d3.axisBottom(x3));
      
  g3.append("g")
      .style("font", "14px Play")
      .style("font-weight", "bold")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(y3));
      
  g3.selectAll(".bar")
    .data(data)
    .enter().append("rect")
      .attr("class", "bar3")
      .attr("x", function(d) { return x3(d.letter); })
      .attr("y", function(d) { return y3(d.frequency); })
      .attr("width", x3.bandwidth())
      .attr("height", function(d) { return height3 - y3(d.frequency); })
      .on('mouseover', tool_tip3.show)
      .on('mouseout', tool_tip3.hide);
});