var gps ={
	speed_mps: 0,
	speed_kph: 0,
	distance_on_geoid: function(lat1,lon1,lat2,lon2){
		// Convert degrees to radians
		lat1 = lat1 * M_PI / 180.0;
		lon1 = lon1 * M_PI / 180.0;

		lat2 = lat2 * M_PI / 180.0;
		lon2 = lon2 * M_PI / 180.0;

		// radius of earth in metres
		var r = 6378100;

		// P
		var rho1 = r * cos(lat1);
		var z1 = r * sin(lat1);
		var x1 = rho1 * cos(lon1);
		var y1 = rho1 * sin(lon1);

		// Q
		var rho2 = r * cos(lat2);
		var z2 = r * sin(lat2);
		var x2 = rho2 * cos(lon2);
		var y2 = rho2 * sin(lon2);

		// Dot product
		var dot = (x1 * x2 + y1 * y2 + z1 * z2);
		var cos_theta = dot / (r * r);

		var theta = acos(cos_theta);

		// Distance in Metres
		return r * theta;
	},
	speed: function(){
		//estimate the average speed by dividing this distance by the time between the two position measurements like this:
		var dist = distance_on_geoid(p1.latitude, p1.longitude, p2.latitude, p2.longitude);
		var time_s = (p2.timestamp - p1.timestamp) / 1000.0;
		this.speed_mps = dist / time_s;
		this.speed_kph = (speed_mps * 3600.0) / 1000.0;	
	}
}