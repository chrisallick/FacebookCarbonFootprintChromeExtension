function playNextSong() {
    current_song++;

    if( current_song <= songs.length ) {
        getURLAndPlay(songs[current_song]);
    }
}

var audio;
function playSong(url) {
    audio = new Audio;
    
    audio.onerror = function() {
        var _msg = "error playing song";
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {type:"msg",msg:_msg}, function(response) {});  
        });
    };
    
    audio.addEventListener("canplaythrough", function() {
        var _msg = "playing song " + (current_song+1);
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {type:"msg",msg:_msg}, function(response) {});  
        });
        audio.play();
    }, false);
    
    audio.addEventListener("ended", function() {
        var _msg = "song ended";
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            chrome.tabs.sendMessage(tabs[0].id, {type:"msg",msg:_msg}, function(response) {});  
        });
        playNextSong();
    });
    audio.src = url;
    audio.load();
}

var songs;
var current_song = -1;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.type == "songs") {
        if( audio ) {
            audio.pause();
        }
        
        current_song = -1;
        
        songs = request.data;
        sendResponse("received songs");
        
        playNextSong();
    } else if( request.type == "pause" ) {
        audio.pause();
    }
});

function getURLAndPlay(base) {
    var url = "http://clubsexytime.com/projects/awesometapes/get.url.php?tape=" + base;
    $.get(url,function(response){
        chrome.extension.getBackgroundPage().console.log(response);

        playSong(response);
    });
}