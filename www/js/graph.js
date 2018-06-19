// This is a JavaScript file


function graphInit(){
    var data = {
      labels: chartX,
      series: [
        leftright,
        frontback
      ]
    }
    
    // As options we currently only set a static size of 300x200 px. We can also omit this and use aspect ratio containers
    // as you saw in the previous example
    var options = {
        high: 12,
        low: -12,
        width: 1000,
        // width: chartX.length*50,
        height: screen.height-100,
        // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
        // axisY: {
        // onlyInteger: false,
        // offset: 20
        // }
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
  
  