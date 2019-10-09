window.onload = function() {

var data = "../sensorstesttt.json";

var requests = [d3.json(data), d3.json(data)];

// load data files
Promise.all(requests).then(function(responses) {

var Data = responses[0];
var WheelDiam = 0.7;
var Circum = WheelDiam * Math.PI;
var Fact = -Circum/360;
var Time = [];
var RotSpeed = [];
var Speed = [];

for (j in Data){
  Time.push(Data[j].time.replace(',', '.'))
  RotSpeed.push(Data[j].rotspeed.replace(',', '.'))

}

for (i in RotSpeed){
  Speed.push(RotSpeed[i]*Fact)
}
var min_speed = 0;
var max_speed = 1;
for (i in Speed){
  if(Speed[i]< min_speed){
    min_speed = Speed[i];
  }
  if(Speed[i]> max_speed){
    max_speed = Speed[i];
  }
}


var data1 = [];

for (i in Time){
  data1.push({
    x: Time[i]*10,
    y: Speed[i]
  });
}

var sum = 0;
for (var i = 0; i < Speed.length; i++) {
  sum += Speed[i]
}

var avg_speed = sum/Speed.length

var info = d3.selectAll("#info")
.html(" <FONT SIZE='5'>Training information <br></FONT>" + "<br>"
+"<strong>Max Speed: </strong><span class='details'>" +  max_speed
+ "<br></span>" + "<strong> Min Speed: </strong><span class='details'>"
 + min_speed + "<br></span>" +
  "<strong> AVG Speed: </strong><span class='details'>" +
   avg_speed + "<br></span>"+ "<strong> Time </strong><span class='details'>"
    + Time[Time.length-1]+"<strong> sec </strong><span class='details'>" +"<br></span>" )


var data = [];
var dataSeries = { type: "line" };

dataSeries.dataPoints = data1;
data.push(dataSeries);

//Better to construct options first and then pass it as a parameter
var options = {
	zoomEnabled: true,
	animationEnabled: true,
	title: {
		text: "Time Speed Chart"
	},
  axisX:{
  title:"Time (seconds x 10)"
 },
	axisY: {
    title: "Speed",
		includeZero: false,
		lineThickness: 1

	},
	data: data
};

var chart = new CanvasJS.Chart("chartContainer", options);
chart.render();

})
}
