/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/

var deviceInfo = function() {
    document.getElementById("platform").innerHTML   = device.platform;
    document.getElementById("version").innerHTML    = device.version;
    document.getElementById("uuid").innerHTML       = device.uuid;
    document.getElementById("name").innerHTML       = device.name;
    document.getElementById("width").innerHTML      = screen.width;
    document.getElementById("height").innerHTML     = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth; 
};
 

var vibrate = function() {
    navigator.notification.vibrate(500);
};

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch   = null;
var initialVal          = null;
var gforcesYZ           = null;
var frontback           = [];
var leftright           = [];
var overallG            = [];
var chartX              = [];
var gravity             = 9.81;
function updateAcceleration(a) {
    if (initialVal == null) {
		initialVal = {x:a.x, y:a.y, z:a.z};
	}
    y = a.y - initialVal.y;
    z = a.z - initialVal.z;
    n = y - z;
    var fb,lr,overall,ltr;
	if(a.y !==null){
        
        //Calculate front to back g forces
		gforcesYZ = Number(Math.sqrt(z*z + y*y).toFixed(2));
		if(n>0){
			//Calculate front back g forces
            fb = Number(gforcesYZ).toFixed(2);
			//push to array for the graph initialisation
            frontback.push(fb/gravity);
			//Update UI
			document.getElementById('x').style.width = ""+(50+gforcesYZ*5)+"%";
   	 		document.getElementById('y').style.width = ""+(50-gforcesYZ*5)+"%";
		}else{
			//Calculate front back g forces
            fb = Math.round(-Number(gforcesYZ).toFixed(2)*2)/2;
			//push to array for the graph initialisation
            frontback.push(fb/gravity);
			//Update UI
   	 		document.getElementById('y').style.width = ""+(50+gforcesYZ*5)+"%";
   	 		document.getElementById('x').style.width = ""+(50-gforcesYZ*5)+"%";
		}
		var fb_no = document.getElementById("fb-no");

		fb_no.textContent = fb;

        //Calculate right to left g forces
        ltr = Number(a.x);
        lr = ltr.toFixed(2);
        leftright.push(lr/gravity);
		
        if(a.x>0){
			//Update UI
    		document.getElementById('x2').style.width = ""+(50+Math.abs(a.x)*5)+"%";
   	 		document.getElementById('x1').style.width = ""+(50-Math.abs(a.x)*5)+"%";
		}else{
			//Update UI
   	 		document.getElementById('x1').style.width = ""+(50+Math.abs(a.x)*5)+"%";
   	 		document.getElementById('x2').style.width = ""+(50-Math.abs(a.x)*5)+"%";
		}
        
		var lr_no = document.getElementById("lr-no");

		lr_no.textContent = lr;
        //Calculating overall G forces
        overall = Math.sqrt(lr*lr+fb*fb);
        overallG.push(overall/gravity);

		//Update acceleroMeter 
		acceleroMeter(fb/gravity, -lr/gravity)
	}
	// if(a.z !== null){
   	// 	document.getElementById('z').style.width = ""+((Math.acos(a.z/initialVal.z)/3.14*180*5).toFixed(2)-6)+"%";
	// }
}

var toggleAccel = function() {
    initialVal = null;
    for (i = 0; i < frontback.length; i++){
         chartX.push(i/10);
    }
    
    if (accelerationWatch !== null) {
		vibrate();
        document.getElementById('play-stop-icon').classList.remove("fa-stop-circle");
        document.getElementById('play-stop-icon').classList.add("fa-play-circle");
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
		vibrate();
        document.getElementById('play-stop-icon').classList.remove("fa-play-circle");
        document.getElementById('play-stop-icon').classList.add("fa-stop-circle");
        var options = {};
        frontback   = [];
        leftright   = [];
        overallG    = [];
        chartX      = [];
        options.frequency = 200;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
};


function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}
