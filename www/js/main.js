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

var getLocation = function() {
    var suc = function(p) {
        alert(p.coords.latitude + " " + p.coords.longitude);
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

var beep = function() {
    var my_media = new Media("beep.wav",
        // success callback
        function() {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function(err) {
            console.log("playAudio():Audio Error: "+err);
    }).play();
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
var chartX              = [];
function updateAcceleration(a) {
    if (initialVal == null) {
		initialVal = {x:a.x, y:a.y, z:a.z};
        console.log(initialVal);
	}
    y = a.y - initialVal.y;
    z = a.z - initialVal.z;
    n = y - z;
	if(a.y !==null){
        
        leftright.push(Number(Math.sqrt(a.x*a.x).toFixed(2)));
        
		gforcesYZ = Number(Math.sqrt(z*z + y*y).toFixed(2));
        
		if(n>0){
            frontback.push(Number(gforcesYZ).toFixed(2));
			document.getElementById('x').style.width = ""+(50+gforcesYZ*5)+"%";
   	 		document.getElementById('y').style.width = ""+(50-gforcesYZ*5)+"%";
		}else{
            frontback.push(Math.round(-Number(gforcesYZ).toFixed(2)*2)/2);
   	 		document.getElementById('y').style.width = ""+(50+gforcesYZ*5)+"%";
   	 		document.getElementById('x').style.width = ""+(50-gforcesYZ*5)+"%";
		}
        if(a.x>0){
    		document.getElementById('x2').style.width = ""+(50+Math.abs(a.x)*5)+"%";
   	 		document.getElementById('x1').style.width = ""+(50-Math.abs(a.x)*5)+"%";
		}else{
   	 		document.getElementById('x1').style.width = ""+(50+Math.abs(a.x)*5)+"%";
   	 		document.getElementById('x2').style.width = ""+(50-Math.abs(a.x)*5)+"%";
		}
	}
	if(a.z !== null){
   		document.getElementById('z').style.width = ""+((Math.acos(a.z/initialVal.z)/3.14*180*5).toFixed(2)-6)+"%";
	}
}

var preventBehavior = function(e) {
    e.preventDefault();
};


function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "10px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = "data:image/jpeg;base64," + data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50,
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 100,
        targetHeight: 100
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

function contacts_success(contacts) {
    alert(contacts.length
            + ' contacts returned.'
            + (contacts[2] && contacts[2].name ? (' Third contact is ' + contacts[2].name.formatted)
                    : ''));
}

function contacts_failed(msgObject){
    alert("Failed to access contact list:" + JSON.stringify(msgObject));
}

function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(
            [ "displayName", "name" ], contacts_success,
            contacts_failed, obj);
}

function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    confirm('Connection type:\n ' + states[networkState]);
}

var watchID = null;

function updateHeading(h) {
    document.getElementById('h').innerHTML = h.magneticHeading;
}

var toggleAccel = function() {
    initialVal = null;
    for (i = 0; i < frontback.length; i++){
         chartX.push(i/10);
    }
    console.log(frontback);
    console.log(leftright);
    console.log(chartX);
    
    if (accelerationWatch !== null) {
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
        document.getElementById('play-stop-icon').classList.remove("fa-play-circle");
        document.getElementById('play-stop-icon').classList.add("fa-stop-circle");
        var options = {};
        frontback   = [];
        leftright   = [];
        chartX      = [];
        options.frequency = 200;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
};

function toggleCompass() {
    if (watchID !== null) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
        updateHeading({ magneticHeading : "Off"});
    } else {        
        var options = { frequency: 1000 };
        watchID = navigator.compass.watchHeading(updateHeading, function(e) {
            alert('Compass Error: ' + e.code);
        }, options);
    }
}

function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}

