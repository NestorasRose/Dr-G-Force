var gps ={
	speed_mps: 0,
	speed_kph: 0,
	mphEl: document.getElementById("mph-no"),
	kphEl: document.getElementById("kph-no"),
	speeds:[],
	p1:{
		latitude:0,
		longitude:0,
		timestamp:0
	},
	p2:{
		latitude:0,
		longitude:0,
		timestamp:0
	},
	active : 0,
	start: function(){
		this.active = setInterval(function(){
			gps.speed();
		},200)
	},
	stop: function(){
		clearInterval(this.active);
	},
	updateLocation: function(){
		var suc = function(p) {
			gps.p1.latitude  = Number(gps.p2.latitude);
			gps.p1.longitude = Number(gps.p2.longitude);
			gps.p1.timestamp = Number(gps.p2.timestamp);

			gps.p2.latitude  = Number(p.coords.latitude);
			gps.p2.longitude = Number(p.coords.longitude);
			gps.p2.timestamp = Number((new Date()).getTime());
		};
		var locFail = function() {
		};
		navigator.geolocation.getCurrentPosition(suc, locFail);
	},
	distance_on_geoid: function(lat1,lon1,lat2,lon2){
		// Convert degrees to radians
		lat1 = lat1 * Math.PI / 180.0;
		lon1 = lon1 * Math.PI / 180.0;

		lat2 = lat2 * Math.PI / 180.0;
		lon2 = lon2 * Math.PI / 180.0;

		// radius of earth in metres
		var r = 6378100;

		// P
		var rho1 = r * Math.cos(lat1);
		var z1 = r * Math.sin(lat1);
		var x1 = rho1 * Math.cos(lon1);
		var y1 = rho1 * Math.sin(lon1);

		// Q
		var rho2 = r * Math.cos(lat2);
		var z2 = r * Math.sin(lat2);
		var x2 = rho2 * Math.cos(lon2);
		var y2 = rho2 * Math.sin(lon2);

		// Dot product
		var dot = (x1 * x2 + y1 * y2 + z1 * z2);
		var cos_theta = dot / (r * r);

		var theta = Math.acos(cos_theta);

		// Distance in Metres
		return r * theta;
	},
	speed: function(){
		// update locations
		gps.updateLocation();
		//estimate the average speed by dividing this distance by the time between the two position measurements like this:
		var dist = this.distance_on_geoid(gps.p1.latitude, gps.p1.longitude, gps.p2.latitude, gps.p2.longitude);
		var time_s = (gps.p2.timestamp - gps.p1.timestamp) / 1000.0;
		this.speed_mps = dist / time_s;
		this.speed_kph = (gps.speed_mps * 3600.0) / 1000.0;	
		if(this.speeds.length == 0){
			this.speeds.push(0)
		}else{
			var speedDiff = this.speed_kph - Number(this.speeds[this.speeds.length - 1]);
			if(speedDiff<20){
				console.log('success')
				this.speeds.push(Number(this.speed_kph))
			}
		}
		if(this.speeds.length>4){
			var kph = (this.speeds[this.speeds.length - 1] + this.speeds[this.speeds.length - 2] + this.speeds[this.speeds.length - 3] + this.speeds[this.speeds.length - 4])/4;
			this.kphEl.textContent = Number(kph).toFixed(2);
			this.mphEl.textContent = Number(kph*1.60934).toFixed(2);
		}
	}
}