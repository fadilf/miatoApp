// localStorage IP Storage
if(localStorage.getItem("ipAddress") == null) {
    localStorage.setItem("ipAddress","http://192.168.1.134/miato-brick/Server-APIs/");
}
var ip = localStorage.getItem("ipAddress");
$("#ipText").val(ip);
$("#ipText").on("input",function(){
    ip = $("#ipText").val();
    localStorage.setItem("ipAddress",ip);
});

// Task Handling
$("#tasks").html("loading...");
$.getJSON(ip+"print2.php").done(function(data){
    arraylen = data.length;
    $("#tasks").html("");
    for(var i=0;i<arraylen;i++){
        if(data[i] == 0){
            $("#tasks").append("<li class='task disabled'>"+(i+1)+"</li>");
        } else {
            $("#tasks").append("<li class='task enabled'>"+(i+1)+"</li>");
        }
    }
    $(".task").click(function(){
        if($(this).hasClass("enabled")) {
            $(this).removeClass("enabled");
            $(this).addClass("disabled");
            changeState($(this).text(),false);
        } else {
            $(this).removeClass("disabled");
            $(this).addClass("enabled");
            changeState($(this).text(),true);
        }
    });
});
function changeState(moduleID, state){
    if(state){
        $.get(ip+"set.php?task="+moduleID+"&state=1");
    } else {
        $.get(ip+"set.php?task="+moduleID+"&state=0");
    }
}
