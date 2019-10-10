function json_on_click(){
  var x = document.getElementById("upload");
  x.onclick = function() {
      var files = document.getElementById('fileupload').files;
    console.log(files);
    if (files.length <= 0) {
      return false;
    }

    var fr = new FileReader();

    fr.onload = function(e) {
    console.log(e);
      var result = JSON.parse(e.target.result);
      var formatted = JSON.stringify(result, null, 2);
      chart(formatted);
    }
    fr.readAsText(files.item(0));
  };

};

function chart(dataset){
var Data = JSON.parse(dataset)

  var WheelDiam = 0.7;
  var Circum = WheelDiam * Math.PI;
  var Fact = -Circum/360;
  var Time = [];
  var RotSpeed = [];
  var RotSpeed2 = [];
  var Speed = [];
  var Speed2 = [];
  var data1 = [];
  var data2 = [];
  var min_speed = 0;
  var max_speed = 1;
  var sum = 0;
  var data = [];
  var data2_2 = [];


  for (j in Data){
    Time.push(Data[j].time.replace(',', '.'))
    RotSpeed.push(Data[j].rotspeed.replace(',', '.'))

  }

  for (i in RotSpeed){
    Speed.push(RotSpeed[i]*Fact)
    RotSpeed2[i]  = parseInt(RotSpeed[i]+(Math.random()*2));
  }

  for (i in RotSpeed2){
    Speed2.push(RotSpeed2[i]*Fact)
  }

  for (i in Speed){
    if(Speed[i]< min_speed){
      min_speed = Speed[i];
    }
    if(Speed[i]> max_speed){
      max_speed = Speed[i];
    }
  }

  for (i in Time){
    data1.push({
      x: Time[i]*10,
      y: Speed[i]
    });
    data2.push({
      x: Time[i]*10,
      y: Speed2[i]
    })
  }


  for (var i = 0; i < Speed.length; i++) {
    sum += Speed[i]
  }

  var avg_speed = sum/Speed.length
  var distance = parseInt(avg_speed*Time[Time.length-1])

  var info = d3.selectAll("#info")
  .html(" <FONT SIZE='5'>Training information <br></FONT>" + "<br>"
  +"<strong>Max Speed:  </strong><span class='details'>" +  max_speed
  + "<strong> m/s </strong><span class='details'>"
   + "<br></span>" + "<strong> Min Speed:  </strong><span class='details'>"
   + min_speed +"<strong> m/s </strong><span class='details'>"
    + "<br></span>" +
    "<strong> AVG Speed: </strong><span class='details'>" +
     avg_speed  +"<strong> m/s </strong><span class='details'>"
      + "<br></span>"+ "<strong> Time:   </strong><span class='details'>"
      + Time[Time.length-1]+"<strong> sec </strong><span class='details'>" +"<br></span>"+
       "<strong> Distance:   </strong><span class='details'>"+ distance +"<strong> m </strong><span class='details'>"
        +"<br></span>" )


  var dataSeries = { type: "line" };
  var dataSeries2 = { type: "line" };

  dataSeries2.dataPoints = data2;
  dataSeries.dataPoints = data1;
  data.push(dataSeries);
  data2_2.push(dataSeries2);


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
      title: "Speed (m/s)",
  		includeZero: false,
  		lineThickness: 1

  	},
    data:data
  };


  var chart = new CanvasJS.Chart("chartContainer",options);
  chart.render();


}
