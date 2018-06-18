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
        // width: document.body.clientWidth,
        width: chartX.length*50,
        height: 700,
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