function getTabs() {
	clearTimeout( get_t );

	chrome.windows.getAll({populate:true},function(windows){
		windows.forEach(function(window){
	    	window.tabs.forEach(function(tab){
	      		var obj = parseURL(tab.url);
	      		if( obj && obj.host ) {
	      			if( obj.host == "www.facebook.com" || obj.host == "facebook.com" ) {
						chrome.storage.sync.get("fb_time", function (result) {
							if( result && result.fb_time ) {
								result.fb_time += 5;
								chrome.storage.sync.set({'fb_time': result.fb_time}, function() {});
							} else {
								chrome.storage.sync.set({'fb_time': 5}, function() {});
							}
						});
	      			}

	      			if( obj.host == "www.youtube.com" || obj.host == "youtube.com" ) {
	      				chrome.storage.sync.get("yt_time", function (result) {
							if( result && result.yt_time ) {
								result.yt_time += 5;
								chrome.storage.sync.set({'yt_time': result.yt_time}, function() {});
							} else {
								chrome.storage.sync.set({'yt_time': 5}, function() {});
							}
	      				});
	      			}

	      			if( obj.host == "www.netflix.com" || obj.host == "netflix.com" ) {
	      				chrome.storage.sync.get("n_time", function (result) {
							if( result && result.n_time ) {
								result.n_time += 5;
								chrome.storage.sync.set({'n_time': result.n_time}, function() {});
							} else {
								chrome.storage.sync.set({'n_time': 5}, function() {});
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
				chrome.storage.sync.set({'c_time': 5}, function() {});
			}
		});

		refresh();

		get_t = setTimeout(function(){
			getTabs();
		}, 5000);
	});
}

function secToKg(seconds, company) {
	var kgpsec;
	if(company == "yt") {
		kgpsec = 1 / 86400;
	} else if( company == "n" ) {
		// 200hrs of netflix is 1kg
		kgpsec = 1 / 720000;
	} else if( company == "fb" ) {
		// don't have this value yet.
		// :(
		kgpsec = 1 / 2419200;
	} else if( company == "c" ) {
		// 1 second of laptop in terms of kg
		kgpsec = 1 / 2419200;
	}

	return (seconds * kgpsec).toFixed(8);
}

function refresh() {
	chrome.storage.sync.get("c_time", function (result) {
		if( result.c_time ) {
			var new_t = (result.c_time / 60).toFixed(2);
			$("#c_time").text(new_t);

			var kg = secToKg(result.c_time, "c");
			$("#c_co2").text(kg);
		} else {
			$("#c_time").text(0);
			$("#c_co2").text(0);
		}
	});

	chrome.storage.sync.get("fb_time", function (result) {
		if( result.fb_time ) {
			var new_t = (result.fb_time / 60).toFixed(2);
			$("#fb_time").text(new_t);

			var kg = secToKg(result.fb_time, "fb");
			$("#fb_co2").text(kg);
		} else {
			$("#fb_time").text(0);
			$("#fb_co2").text(0);
		}
	});

	chrome.storage.sync.get("yt_time", function (result) {
		if( result.yt_time ) {
			var new_t = (result.yt_time / 60).toFixed(2);
			$("#yt_time").text(new_t);	

			var kg = secToKg(result.yt_time, "yt");
			$("#yt_co2").text(kg);
		} else {
			$("#yt_time").text(0);
			$("#yt_co2").text(0);
		}
	});

	chrome.storage.sync.get("n_time", function (result) {
		if( result.n_time ) {
			var new_t = (result.n_time / 60).toFixed(2);
			$("#n_time").text(new_t);

			var kg = secToKg(result.n_time, "n");
			$("#n_co2").text(kg);
		} else {
			$("#n_time").text(0);
		}
	});
}

var get_t;
$(document).ready(function() {
	get_t = setTimeout(function(){
		getTabs();
	}, 5000);

	refresh();
});