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
	clearTimeout( get_t );

	var loaded = 0.0;
	var total = 0;

	chrome.storage.sync.get("c_time", function (result) {
		if( result.c_time ) {
			var new_t = (result.c_time / 60).toFixed(2);
			$("#c_time").text(new_t);

			var kg = secToKg(result.c_time, "c");
			$("#c_co2").text(kg);

			total += parseFloat(kg);
			loaded++;
			if( loaded == 4 ) {
				$("#total_co2").text(total.toFixed(6));
			}
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

			total += parseFloat(kg);
			loaded++;
			if( loaded == 4 ) {
				$("#total_co2").text(total.toFixed(6));
			}
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

			total += parseFloat(kg);
			loaded++;
			if( loaded == 4 ) {
				$("#total_co2").text(total.toFixed(6));
			}
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

			total += parseFloat(kg);
			loaded++;
			if( loaded == 4 ) {
				$("#total_co2").text(total.toFixed(6));
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

var get_t;
$(document).ready(function() {
	get_t = setTimeout(function(){
		refresh();
	}, 1000);
});