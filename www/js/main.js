var main = {
    accelerationWatch   : null,
    initialVal          : null,
    gforcesYZ           : null,
    overallG            : [],
    chartX              : [],
    gravity             : 9.81,
    accelBtn            : document.getElementById('play-stop-icon'),
    frontback : {
        x1  : document.getElementById('x1'),
        x2  : document.getElementById('x2'),
        Array : []
    },
    leftright : {
        y1  : document.getElementById('y1'),
        y2  : document.getElementById('y2'),
        Array : []
    },
    init : function(){
        // the next line makes it impossible to see Contacts on the HTC Evo since it
        // doesn't have a scroll button
        // document.addEventListener("touchmove", preventBehavior, false);
        document.addEventListener("deviceready", this.deviceInfo, true);
    },
    deviceInfo : function() {
        document.getElementById("platform").innerHTML   = device.platform;
        document.getElementById("version").innerHTML    = device.version;
        document.getElementById("uuid").innerHTML       = device.uuid;
        document.getElementById("name").innerHTML       = device.name;
        document.getElementById("width").innerHTML      = screen.width;
        document.getElementById("height").innerHTML     = screen.height;
        document.getElementById("colorDepth").innerHTML = screen.colorDepth; 
    },
    roundNumber : function(num){
        var dec = 3;
        var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
        return result;
    },
    vibrate : function(){
        navigator.notification.vibrate(500);
    },
    updateAcceleration(a) {
        if (main.initialVal == null) {
            main.initialVal = {x:a.x, y:a.y, z:a.z};
        }
        y = a.y - main.initialVal.y;
        z = a.z - main.initialVal.z;
        n = y - z;
        var fb,lr,overall,ltr;
        if(a.y !==null){
            
            //Calculate front to back g forces
            main.gforcesYZ = Number(Math.sqrt(z*z + y*y).toFixed(2));
            if(n>0){
                //Calculate front back g forces
                fb = Number(main.gforcesYZ).toFixed(2);
                //push to Array for the graph initialisation
                main.frontback.Array.push(fb/main.gravity);
                //Update UI
                main.frontback.x1.style.width = ""+(50+main.gforcesYZ*5)+"%";
                main.frontback.x2.style.width = ""+(50-main.gforcesYZ*5)+"%";
            }else{
                //Calculate front back g forces
                fb = Math.round(-Number(main.gforcesYZ).toFixed(2)*2)/2;
                //push to Array for the graph initialisation
                main.frontback.Array.push(fb/main.gravity);
                //Update UI
                main.frontback.x2.style.width = ""+(50+main.gforcesYZ*5)+"%";
                main.frontback.x1.style.width = ""+(50-main.gforcesYZ*5)+"%";
            }

            //Calculate right to left g forces
            ltr = Number(a.x);
            lr = ltr.toFixed(2);
            main.leftright.Array.push(lr/main.gravity);
            
            if(a.x>0){
                //Update UI
                main.leftright.y2.style.width = ""+(50+Math.abs(a.x)*5)+"%";
                main.leftright.y1.style.width = ""+(50-Math.abs(a.x)*5)+"%";
            }else{
                //Update UI
                main.leftright.y1.style.width = ""+(50+Math.abs(a.x)*5)+"%";
                main.leftright.y2.style.width = ""+(50-Math.abs(a.x)*5)+"%";
            }
            //Calculating overall G forces
            overall = Math.sqrt(lr*lr+fb*fb);
            main.overallG.push(overall/main.gravity);
            document.getElementById("fb-no").textContent =fb;
            document.getElementById("lr-no").textContent =lr;
            //Update acceleroMeter 
            acceleroMeter(fb/main.gravity, -lr/main.gravity)
        }
    },
    toggleAccel : function() {
        main.initialVal = null;
        for (i = 0; i < main.frontback.Array.length; i++){
             main.chartX.push(i/10);
        }
        
        if (main.accelerationWatch !== null) {
            main.vibrate();
            main.accelBtn.classList.remove("fa-stop-circle");
            main.accelBtn.classList.add("fa-play-circle");
            navigator.accelerometer.clearWatch(main.accelerationWatch);
            main.updateAcceleration({
                x : "",
                y : "",
                z : ""
            });
            this.accelerationWatch = null;
        } else {
            main.vibrate();
            // gps.start();
            main.accelBtn.classList.remove("fa-play-circle");
            main.accelBtn.classList.add("fa-stop-circle");
            var options = {};
            main.frontback.Array   = [];
            main.leftright.Array   = [];
            main.overallG    = [];
            main.chartX      = [];
            options.frequency = 200;
            this.accelerationWatch = navigator.accelerometer.watchAcceleration(
                    main.updateAcceleration, function(ex) {
                        alert("accel fail (" + ex.name + ": " + ex.message + ")");
                    }, options);
        }
    }
};