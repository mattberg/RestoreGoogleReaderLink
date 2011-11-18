(function($) {

	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
		if (request.method === "getOptions") {
			sendResponse({ tabLocation: localStorage.RestoreGoogleReaderLink_tabLocation, tabName: localStorage.RestoreGoogleReaderLink_tabName });
		} else {
			sendResponse({});
		}
	});

	var tabLocation = localStorage.RestoreGoogleReaderLink_tabLocation,
		tabName = localStorage.RestoreGoogleReaderLink_tabName;
	
	if (tabLocation) {
		$("#tablocation").val(tabLocation);
	}

	if (tabName) {
		$("#tabname").val(tabName);
	}

	$("#save").click(function(e) {
	
		var tabLocation = parseInt($("#tablocation").val(), 10),
			tabName = $("#tabname").val();
		
		if (tabLocation) {
			tabLocation = Math.abs(tabLocation);
			
			localStorage.RestoreGoogleReaderLink_tabLocation = tabLocation;
		}
		
		if (tabName) {
			localStorage.RestoreGoogleReaderLink_tabName = tabName;
		}
		
		var message = $("<div>").addClass("message").html("Options saved.");
		
		$("#main").prepend(message);
		
		setTimeout(function() {
			message.fadeOut('normal', function() {
				message.remove();
			});
		}, 750);
		
	});
	
})(jQuery);