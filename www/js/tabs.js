// This is a JavaScript file


function selectTab(elementid) {
    document.getElementById('tab-1').classList.add("d-none");
    document.getElementById('btn-tab-1').style.color = "#f7baba";
    document.getElementById('tab-2').classList.add("d-none");
    document.getElementById('btn-tab-2').style.color = "#f7baba";
    document.getElementById(elementid).classList.remove("d-none");
    if(elementid=='tab-2'){
        graphInit();
    }
    document.getElementById('btn-'+elementid).style.color = "#fff";
}