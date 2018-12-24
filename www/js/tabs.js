// This is a JavaScript file


function selectTab(elementid) {
    document.getElementById('tab-1').classList.add("d-none");
    document.getElementById('btn-tab-1').style.color = "#777";
    document.getElementById('tab-2').classList.add("d-none");
    document.getElementById('btn-tab-2').style.color = "#777";
    document.getElementById('tab-3').classList.add("d-none");
    document.getElementById('btn-tab-3').style.color = "#777";
    document.getElementById('tab-4').classList.add("d-none");
    document.getElementById('btn-tab-4').style.color = "#777";
    document.getElementById(elementid).classList.remove("d-none");
    if(elementid=='tab-2'){
        graphInit('fb');
    }
    if(elementid=='tab-3'){
        main.geoCanvas();
    }
    document.getElementById('btn-'+elementid).style.color = "#555";
};