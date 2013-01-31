$(document).ready(function() {
	$("#toggle-xqueryx-small-script-button").click(function() {
		if ($(this).text() == 'Show') {
			$(this).text('Hide');
		} else {
			$(this).text('Show');
		}
		$("#xqueryx-small-script-source").toggle();
	});
	
	$("#toggle-xqueryx-large-script-button").click(function() {
		if ($(this).text() == 'Show') {
			$(this).text('Hide');
		} else {
			$(this).text('Show');
		}
		$("#xqueryx-large-script-source").toggle();
	});
	
	$kyer.parseTest = function(sXMLstring) {
	};
	
	for (xqxId in $kyer.xqx) {
		var xqueryScript = $kyer.serialize($kyer.xqx[xqxId]);
		if (xqueryScript.indexOf("large") != -1) {
			$("#xqueryx-large-script-source").text(xqueryScript);
		} else {
			$("#xqueryx-small-script-source").text(xqueryScript);
		}
	}
	
	JSLitmus.test("Parse a XQueryX script with size of 6.3 kB, with $kyer.parse()", function(count) {
		var xqueryScript = $("#xqueryx-small-script-source").text();
		while (count--) {
			$kyer.parse(xqueryScript);
		}
	});
	
	JSLitmus.test("Parse a XQueryX script with size of 6.3 kB, with parseFromString()", function(count) {
		var xqueryScript = $("#xqueryx-small-script-source").text();
		while (count--) {
			var oDOMParser = new DOMParser();
			oDOMParser.parseFromString(xqueryScript, "text/xml");
		}
	});
	

	JSLitmus.test("Parse a XQueryX script with size of 102.9 kB, with $kyer.parse()", function(count) {
		var xqueryScript = $("#xqueryx-large-script-source").text();
		while (count--) {
			$kyer.parse(xqueryScript);
		}
		
	});
	
	JSLitmus.test("Parse a XQueryX script with size of 102.9 kB, with parseFromString()", function(count) {
		var xqueryScript = $("#xqueryx-large-script-source").text();
		while (count--) {
			var oDOMParser = new DOMParser();
			oDOMParser.parseFromString(xqueryScript, "text/xml");
		}
		
	});
	
	JSLitmus.test("Run $kyer.parseTest()", function(count) {
		var xqueryScript = "";
		for (xqxId in $kyer.xqx) {
			xqueryScript = $kyer.serialize($kyer.xqx[xqxId]);
		}
		while (count--) {
			$kyer.parseTest(xqueryScript);
		}
	});


});