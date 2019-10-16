window.onload = function () {
        dataset("sensors1.json");

    // var data = [];
    // var data = dataset("sensors.json");
    // console.log(data)
    // chart(dataset("sensors.json"));
    // $.getJSON("http://localhost:8080/files/sensors.json", function (data) {
    //     var datapoint = dataset(data);
    //     console.log(datapoint)
    //     chart(datapoint);
    // });
    // $.getJSON("http://localhost:8080/files/sensors2.json", function(data) {
    //     var datapoint = dataset(data);
    //     chart(datapoint);
    // });

    function dataset(filename) {
        $.getJSON("/" + filename, function (dataset) {
            var WheelDiam = 0.7;
            var Circum = WheelDiam * Math.PI;
            var Fact = -Circum / 360;
            var Time = [];
            var RotSpeed = [];
            var Speed = [];
            var data1 = [];
            var data = [];
            var Speed2 = [];
            var dataset2 =[];
            var data2 = [];
            var num=[];


            for (j in dataset) {
                Time.push(parseFloat(dataset[j]["Time (s)"].replace(',', '.')))
                RotSpeed.push(parseFloat(dataset[j]["Gyroscope Z (deg/s)"].replace(',', '.')))
              }

            for (i in RotSpeed) {
              if(RotSpeed[i] * Fact > 0.1){
                Speed.push(RotSpeed[i] * Fact)
                num.push(i)
              }
            }
            for (i in Speed) {
              var number = parseInt(i)+parseInt(num[0])
              Speed2.push(Speed[i]*0.8);
              data1.push({
                  x: parseFloat(Time[number]),
                  y: (Speed[i]*3.6)
                });
              }

            for (i in Speed){
              var number = parseInt(i)+parseInt(num[0])
                data2.push({
                    x: parseFloat(Time[number]),
                    y: (Speed2[i]*3.6)
                });
            }

            chart(data1, data2)

            metrics(Speed, Time, "dataset1", parseInt(num[0]));
            metrics(Speed2, Time, "dataset2",parseInt(num[0]));

        });
    }

    function chart(datapoint1, datapoint2) {

        var options = {
            zoomEnabled: true,
            animationEnabled: true,
            title: {
                text: "Time Speed Chart"
            },
            axisX: {
                title: "Time (sec)"
            },
            axisY: {
                title: "Speed (km/h)",
                includeZero: false,
                lineThickness: 1

            },
            data: [{
                type: "line",
                showInLegend: true,
                dataPoints: datapoint1
            },
                {
                    type: "line",
                    showInLegend: true,
                    dataPoints: datapoint2
                }]
        };


        var chart = new CanvasJS.Chart("chartContainer", options);
        chart.render();

    }
    function metrics(Speed, Time, name, num){

        var min_speed = 0;
        var max_speed = 1;
        var sum = 0;
        var avg_speed = 0;
        var distance = 0;
        var time_to_max = 0;
        var distance_at_max = 0;
        var dist = [];
        var i_max_speed= 0;
        var sum_max = 0;

        for (i in Speed) {
            sum += Speed[i]
            dist.push((Speed[i]*Time[i]))
        }

        for (i in Speed){
            if(Speed[i]*3.6 < min_speed){
                min_speed = Speed[i]*3.6;
              }
            if(Speed[i]*3.6 > max_speed){
                max_speed = Speed[i]*3.6;
                i_max_speed = i;
            }
        }
        for(i in Speed){
          if(Speed[i]*3.6 == max_speed){
            time_to_max = Time[parseInt(i)+num]
          }
          if(parseInt(i)<=i_max_speed){
            sum_max += Speed[i]
          }
        }


        avg_speed = sum/Speed.length
        var avg_speed_max = sum_max/i_max_speed
        distance = parseInt(avg_speed*Time[Time.length-1])
        distance_max_speed = parseInt(avg_speed_max*time_to_max)
        console.log(distance_max_speed);

        var info = d3.selectAll("#"+name)
            .html(" <FONT SIZE='5'>Training information  <br></FONT>"+
                name+ "<br>"
                +"<strong>Max Speed:  </strong><span class='details'>" +  max_speed
                + "<strong> km/h </strong><span class='details'>"
                + "<br></span>" + "<strong> AVG Speed: </strong><span class='details'>"
                + avg_speed*3.6  +"<strong> km/h </strong><span class='details'>"
                + "<br></span>"+ "<strong> Time:   </strong><span class='details'>"
                + Time[Time.length-1]+"<strong> sec </strong><span class='details'>"
                +"<br></span>"+  "<strong> Time to max speed:   </strong><span class='details'>"
                + time_to_max+"<strong> sec </strong><span class='details'>"
                +"<br></span>"+ "<strong> Distance:   </strong><span class='details'>"
                + distance +"<strong> m </strong><span class='details'>" +"<br></span>"+
                "<strong> Distance at max speed:   </strong><span class='details'>"
                + distance_max_speed +"<strong> m </strong><span class='details'>" +"<br></span>" )
    }


}
