// This is a JavaScript file


function graphInit(chart){
	var lowest = 0;
	var dataChart;

	if(chart == 'fb'){
		lowest = -1.5;
		highest = 1.5;
		dataChart = main.frontback.Array;
	}
	if(chart == 'lr'){
		lowest = -1.5;
		highest = 1.5;
		dataChart = main.leftright.Array;
	}
	if(chart == 'total'){
		lowest = 0;
		highest = 2;
		dataChart = main.overallG;
	}
	console.log(dataChart)
    var data = {
      labels: main.chartX,
      series: [
        dataChart
      ]
    }
    
    // As options we currently only set a static size of 300x200 px. We can also omit this and use aspect ratio containers
    // as you saw in the previous example
    var options = {
        high: highest,
        low: lowest,
        width: main.chartX.length*50,
        // width: chartX.length*50,
        height: screen.height-160,
        // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
        axisY: {
            labelInterpolationFnc: function(value) {
              return  value + 'g';
            }
        }, 
        axisX: {
            labelInterpolationFnc: function(value) {
              return  value + ' s';
            }
        }
    }
    
    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object. As a third parameter we pass in our custom options.
    new Chartist.Line('.ct-chart', data, options);
}
  
function dw_getScrollOffsets() {
    var doc = document, w = window;
    var x, y, docEl;
    
    if ( typeof w.pageYOffset === 'number' ) { 
        x = w.pageXOffset;
        y = w.pageYOffset;
    } else {
        docEl = (doc.compatMode && doc.compatMode === 'CSS1Compat')?
                doc.documentElement: doc.body;
        x = docEl.scrollLeft;
        y = docEl.scrollTop;
    }
    var all = doc.getElementsByClassName('ct-vertical');
    for (var i = 0; i < all.length; i++) {
	  all[i].parentNode.setAttribute("x", 10+x);
	}
}

setInterval(function(){dw_getScrollOffsets()},200)
  
  