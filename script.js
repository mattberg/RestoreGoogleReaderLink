(function($) {

	var tabLocation = 0,
		tabName = "";
	
	chrome.extension.sendRequest({ method: "getOptions" }, function(response) {
	
		if (response) {
		
			if (response.tabLocation) {
				tabLocation = parseInt(response.tabLocation, 10);
			}
			
			if (response.tabName) {
				tabName = response.tabName;
			}
			
		}
		
		if (tabLocation === 0) {
			tabLocation = 3;
		}
		
		if (tabName === "") {
			tabName = "Reader";
		}
		
	});
	
	var checkTimeout = 200,
		checkCount = 0,
		checkMaxCount = 40;
	
	var checkTabs = function() {
	
		if (tabLocation > 0) {
	
			var tabs = $("#gbz .gbtc > .gbt");
			
			if (tabs.size() === 0) {
				
				var iframe = $("#canvas_frame");
				
				if (iframe.size() > 0) {
				
					tabs = iframe.contents().find("#gbz .gbtc > .gbt");
				
				}
				
			}
			
			if (tabs.size() > 0 && tabs.filter(".RestoreGoogleReaderLink").size() === 0) {
		
				var readerTab = $("<li>").addClass("gbt RestoreGoogleReaderLink"),
					readerLink = $("<a>").addClass("gbzt").attr("href", "http://www.google.com/reader/view/?hl=en&tab=wy").attr("target", "_blank"),
					readerLinkTop = $("<span>").addClass("gbtb2"),
					readerLinkText = $("<span>").addClass("gbts").text(tabName);
				
				try {
				
					var url = window.location.href,
						regex = /https?:\/\/www.google.com\/reader\/.*/ig;
					
					if (url.match(regex)) {
						readerLinkTop.css("border-top-color", "#DD4B39");
						readerLinkText.css("color", "#FFFFFF").css("font-weight", "bold");
					}
					
				} catch(e) {}

				readerLink.click(function(e) {
					try {
						gbar.qs(this);
					} catch(e) {}
				}).hover(function() {
					$(this).css("background-color", "#4c4c4c");
				}, function() {
					$(this).css("background-color", "transparent");
				});
				
				readerTab.append(readerLink.append(readerLinkTop).append(readerLinkText));
				
				var tabInsert = tabs.eq(tabLocation - 1);
				
				if (tabInsert.size() === 0) {
					tabInsert = tabs.last();
				}
				
				tabInsert.before(readerTab);
				
			}
			
		}
		
		checkCount++;
		
		if (checkCount < checkMaxCount) {
			setTimeout(checkTabs, checkTimeout);
		}
	};	
	
	checkTabs();
	
})(jQuery);