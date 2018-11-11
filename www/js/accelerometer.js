//acelerometer canvas
var width 	= 130;
var height 	= 130;

var canvas 	= document.getElementById("accelerometer");
var circle1 = canvas.getContext("2d");
var cX 		= width/2;
var cY 		= height/2;
var circleRadius = (width-10)/2;
	circle1.beginPath();
	circle1.arc(cX,cY,circleRadius,0,2*Math.PI);
	circle1.stroke();

var line 	= canvas.getContext("2d");
var horizontalDistance,verticalDistance;

function acceleroMeter(fb,lr){
	//clear canvas
	line.clearRect(0,0,canvas.width,canvas.height);

	//circle
	circle1.beginPath();
	circle1.arc(cX,cY,circleRadius,0,2*Math.PI);
	circle1.stroke();

	horizontalDistance = cX + circleRadius*Number(lr);
	verticalDistance = cY + circleRadius*Number(fb);
	line.beginPath();
	line.moveTo(cX,cY);
	line.lineTo(horizontalDistance,verticalDistance);
	line.closePath();
	line.stroke();
}