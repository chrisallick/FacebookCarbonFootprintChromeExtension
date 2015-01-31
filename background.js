// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.type == "songs") {
//     }
// });

/**
 * parses a URL string into an object of parts
 */
function parseURL(url) {
    var parser = document.createElement('a'),
        searchObject = {},
        queries, split, i;
    // Let the browser do the work
    parser.href = url;
    // Convert query string to object
    queries = parser.search.replace(/^\?/, '').split('&');
    for( i = 0; i < queries.length; i++ ) {
        split = queries[i].split('=');
        searchObject[split[0]] = split[1];
    }
    return {
        protocol: parser.protocol,
        host: parser.host,
        hostname: parser.hostname,
        port: parser.port,
        pathname: parser.pathname,
        search: parser.search,
        searchObject: searchObject,
        hash: parser.hash
    };
}

function getTabs() {
    clearTimeout( t );

    chrome.windows.getAll({populate:true},function(windows){
        windows.forEach(function(window){
            window.tabs.forEach(function(tab){
                var obj = parseURL(tab.url);
                if( obj && obj.host ) {
                    if( obj.host == "www.facebook.com" || obj.host == "facebook.com" ) {
                        chrome.storage.sync.get("fb_time", function (result) {
                            if( result && result.fb_time ) {
                                result.fb_time += 10;
                                chrome.storage.sync.set({'fb_time': result.fb_time}, function() {});
                            } else {
                                chrome.storage.sync.set({'fb_time': 10}, function() {});
                            }
                        });
                    }

                    if( obj.host == "www.youtube.com" || obj.host == "youtube.com" ) {
                        chrome.storage.sync.get("yt_time", function (result) {
                            if( result && result.yt_time ) {
                                result.yt_time += 10;
                                chrome.storage.sync.set({'yt_time': result.yt_time}, function() {});
                            } else {
                                chrome.storage.sync.set({'yt_time': 10}, function() {});
                            }
                        });
                    }

                    if( obj.host == "www.netflix.com" || obj.host == "netflix.com" ) {
                        chrome.storage.sync.get("n_time", function (result) {
                            if( result && result.n_time ) {
                                result.n_time += 10;
                                chrome.storage.sync.set({'n_time': result.n_time}, function() {});
                            } else {
                                chrome.storage.sync.set({'n_time': 10}, function() {});
                            }
                        });
                    }
                }
            });
        });

        chrome.storage.sync.get("c_time", function (result) {
            if( result && result.c_time ) {
                result.c_time += 5;
                chrome.storage.sync.set({'c_time': result.c_time}, function() {});
            } else {
                chrome.storage.sync.set({'c_time': 10}, function() {});
            }
        });

        t = setTimeout(function(){
            getTabs();
        }, 10000);
    });
}

var t = setTimeout(function(){
    getTabs();
}, 10000);