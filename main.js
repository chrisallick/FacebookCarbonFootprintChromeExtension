$(document).ready(function() {
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if( request.type == "msg" ) {
            console.log( request.msg );
        }
    });

    var songs = new Array();
    $(".wpaudio").each(function(val,index){
        var src = $(this).attr("href");
        songs.push( src );
    });

    if( songs.length > 0 ) {
        chrome.runtime.sendMessage({type:"songs",data:songs},function(response) {
            console.log(response);
        });
    }

    addEventListener("unload", function (event) {
        chrome.runtime.sendMessage({type:"pause"},function(response) {});
    }, true);
});