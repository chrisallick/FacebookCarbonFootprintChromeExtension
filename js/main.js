function toHHMMSS( _time ) {
    var sec_num = _time; // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    var time    = hours+'hr '+minutes+'min '+seconds+'sec';
    
    return time;
}

/**
 * convert seconds to kg of co2 for each company
 */
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

	return (seconds * kgpsec).toFixed(3);
}

/**
 * redraw all the data points
 */
function refresh() {
	clearTimeout( get_t );

	var loaded = 0.0;
	var total = 0;

	chrome.storage.sync.get("c_time", function (result) {
		if( result.c_time ) {
			$("#c_time").text(toHHMMSS(result.c_time));

			var kg = secToKg(result.c_time, "c");
			$("#c_co2").text(kg);

			total += parseFloat(kg);
			loaded++;
			if( loaded == 4 ) {
				$("#total_co2").text(total.toFixed(3));
			}
		} else {
			$("#c_time").text(0);
			$("#c_co2").text(0);
		}
	});

	chrome.storage.sync.get("fb_time", function (result) {
		if( result.fb_time ) {
			$("#fb_time").text(toHHMMSS(result.fb_time));

			var kg = secToKg(result.fb_time, "fb");
			$("#fb_co2").text(kg);

			total += parseFloat(kg);
			loaded++;
			if( loaded == 4 ) {
				$("#total_co2").text(total.toFixed(3));
			}
		} else {
			$("#fb_time").text(0);
			$("#fb_co2").text(0);
		}
	});

	chrome.storage.sync.get("yt_time", function (result) {
		if( result.yt_time ) {
			$("#yt_time").text(toHHMMSS(result.yt_time));

			var kg = secToKg(result.yt_time, "yt");
			$("#yt_co2").text(kg);

			total += parseFloat(kg);
			loaded++;
			if( loaded == 4 ) {
				$("#total_co2").text(total.toFixed(3));
			}
		} else {
			$("#yt_time").text(0);
			$("#yt_co2").text(0);
		}
	});

	chrome.storage.sync.get("n_time", function (result) {
		if( result.n_time ) {
			$("#n_time").text(toHHMMSS(result.n_time));

			var kg = secToKg(result.n_time, "n");
			$("#n_co2").text(kg);

			total += parseFloat(kg);
			loaded++;
			if( loaded == 4 ) {
				$("#total_co2").text(total.toFixed(3));
			}
		} else {
			$("#n_time").text(0);
			$("#n_co2").text(0);
		}
	});

	get_t = setTimeout(function(){
		refresh();
	}, 1000);
}

/**
 * every 1 second call the refresh
 */
var get_t;
$(document).ready(function() {
	refresh();
});