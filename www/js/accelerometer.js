//acelerometer canvas
var canvas 	= document.getElementById("accelerometer");
var width 	= screen.height/5;
var height 	= width;

canvas.setAttribute('width', width + "px");
canvas.setAttribute('height',height + "px");
var circleRadius 	= (width-20)/2;

var circle1 	= canvas.getContext("2d");
var circle2 	= canvas.getContext("2d");
var circle3 	= canvas.getContext("2d");
var circle4 	= canvas.getContext("2d");
var incicator1 	= canvas.getContext("2d");
var incicator2 	= canvas.getContext("2d");
var incicator3 	= canvas.getContext("2d");
var incicator4 	= canvas.getContext("2d");
var line 		= canvas.getContext("2d");
var cX 			= width/2;
var cY 			= height/2;



var horizontalDistance,verticalDistance;

function acceleroMeter(fb,lr){
	//clear canvas
	line.clearRect(0,0,canvas.width,canvas.height);

	//circles
	circle1.beginPath();
	circle1.arc(cX,cY,circleRadius,0,2*Math.PI);
	circle1.strokeStyle = '#222';
	circle1.fillStyle = '#eee';
	circle1.fill();
	circle1.stroke();

	circle2.beginPath();
	circle2.arc(cX,cY,circleRadius*3/4,0,2*Math.PI);
	circle2.strokeStyle = '#666';
	circle2.stroke();

	circle3.beginPath();
	circle3.arc(cX,cY,circleRadius/2,0,2*Math.PI);
	circle3.strokeStyle = '#888';
	circle3.stroke();

	circle4.beginPath();
	circle4.arc(cX,cY,circleRadius/4,0,2*Math.PI);
	circle4.strokeStyle = '#aaa';
	circle4.stroke();

	//Indicators
	incicator1.font = "8px Arial";
	incicator1.fillStyle = "#222";
	incicator1.fillText("0.25g",cX,cY-circleRadius/4);

	incicator2.font = "8px Arial";
	incicator1.fillStyle = "#222";
	incicator2.fillText("0.5g",cX,cY-circleRadius/2);
	
	incicator3.font = "8px Arial";
	incicator1.fillStyle = "#222";
	incicator3.fillText("0.75g",cX,cY-circleRadius*3/4);
	
	incicator4.font = "10px Arial";
	incicator1.fillStyle = "#222";
	incicator4.fillText("1g",cX,cY-circleRadius);

	//line
	horizontalDistance 	= cX + circleRadius*Number(lr);
	verticalDistance 	= cY + circleRadius*Number(fb);
	line.beginPath();
	line.moveTo(cX,cY);
	line.lineTo(horizontalDistance,verticalDistance);
	line.closePath();
	// set line color
	line.strokeStyle = '#ff0000';
	line.stroke();
};
acceleroMeter(0,0);