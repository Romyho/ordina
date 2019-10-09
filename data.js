window.onload = function() {

var data = "../../sensors.json";

var requests = [d3.json(data), d3.json(data)];

// load data files
Promise.all(requests).then(function(responses) {

var Data = responses[0];
console.log(Data);
// make dictionary of data
// var data = {};
var Time = [];
var RotSpeed = [];
var Speed = [];


for (j in Data){
  Time.push(Data[j].Time)
  RotSpeed.push(Data[j].RotSpeed)
  Speed.push(Data[j].Speed)

}

// var data1 = {x:[Time],
//   y: [Speed],
//    mode: 'lines'};
//
// var trace1 = {
//   x: [1, 2, 3, 4],
//   y: [10, 15, 13, 17],
//   type: 'scatter',
// };
//
// var trace2 = {
//   x: [1, 2, 3, 4],
//   y: [16, 5, 11, 9],
//   type: 'scatter'
// };
//
// var data = [data1];
// Plotly.newPlot('myDiv', data, {}, {showSendToCloud: true});

// var chart = new CanvasJS.Chart("chartContainer", {
// 	animationEnabled: true,
// 	theme: "light2",
// 	title:{
// 		text: "Simple Line Chart"
// 	},
// 	axisY:{
// 		includeZero: false
// 	},
// 	data: [{
// 		type: "line",
// 		dataPoints: [x:Time, y:Speed]
// 	}]
// });
// chart.render();
//
// var options = {
//             chart: {
//                 height: 350,
//                 type: 'line',
//                 zoom: {
//                     enabled: false
//                 }
//             },
//             series: [{
//                 name: "Desktops",
//                 data: Speed
//             }],
//             dataLabels: {
//                 enabled: false
//             },
//             stroke: {
//                 curve: 'straight'
//             },
//             title: {
//                 text: 'Product Trends by Month',
//                 align: 'left'
//             },
//             grid: {
//                 row: {
//                     colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
//                     opacity: 0.5
//                 },
//             }
//             // xaxis: {
//             //   Time,
//             // }
//         }
//
//         var chart = new ApexCharts(
//             document.querySelector("#chart"),
//             options
//         );
//
//         chart.render();

// // 2. Use the margin convention practice
// var margin = {top: 50, right: 50, bottom: 50, left: 50}
//   , width = window.innerWidth - margin.left - margin.right // Use the window's width
//   , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height
//
// // The number of datapoints
// var n = Data.length;
//
// // 5. X scale will use the index of our data
// var xScale = d3.scaleLinear()
//     .domain([0, n-1]) // input
//     .range([0, width]); // output
//
// // 6. Y scale will use the randomly generate number
// var yScale = d3.scaleLinear()
//     .domain([0, 1]) // input
//     .range([height, 0]); // output
//
// // 7. d3's line generator
// var line = d3.line()
//     .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
//     .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
//     .curve(d3.curveMonotoneX) // apply smoothing to the line
//
// // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
// var dataset = d3.range(n).map(function(d) { return {"y": d3.randomUniform(1)() } })
//
// // 1. Add the SVG to the page and employ #2
// var svg = d3.select("body").append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// // 3. Call the x axis in a group tag
// svg.append("g")
//     .attr("class", "x axis")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(xScale)); // Create an axis component with d3.axisBottom
//
// // 4. Call the y axis in a group tag
// svg.append("g")
//     .attr("class", "y axis")
//     .call(d3.axisLeft(yScale)); // Create an axis component with d3.axisLeft
//
// // 9. Append the path, bind the data, and call the line generator
// svg.append("path")
//     .datum(dataset) // 10. Binds data to the line
//     .attr("class", "line") // Assign a class for styling
//     .attr("d", line); // 11. Calls the line generator

})
}
