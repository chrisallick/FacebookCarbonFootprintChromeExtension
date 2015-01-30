var t = 10;
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

    // chrome.storage.local.set({'didSubmit_t': "false"}, function (result) {

    // });

    chrome.storage.sync.set({'rand_value': "coo"}, function() {
      	console.log("ASDFs");
    });

    console.log(t);
});