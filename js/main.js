$(document).ready(function() {
    // receive messages
    // chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    //     if( request.type == "msg" ) {
    //         console.log( request.msg );
    //     }
    // });

    // send message
    // addEventListener("unload", function (event) {
    //     chrome.runtime.sendMessage({type:"pause"},function(response) {});
    // }, true);

    // $(window).unload(function(){

	   //  //return false;
    // });

	chrome.windows.getAll({populate:true},function(windows){
		windows.forEach(function(window){
	    	window.tabs.forEach(function(tab){
				//collect all of the urls here, I will just log them instead
	      		console.log(tab.url);
	    	});
	  	});
	});

    chrome.storage.sync.get("last_time", function (result) {
    	console.log( result );
    });

    addEventListener("unload", function (event) {
		var t = new Date().getTime();
	    chrome.storage.sync.set({'last_time': t}, function() {});
    }, true);
});