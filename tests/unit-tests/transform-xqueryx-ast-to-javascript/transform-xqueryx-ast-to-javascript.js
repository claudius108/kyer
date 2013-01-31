$(document).ready(function() {
	$("#toggle-xqueryx-script-button").click(function() {
		if ($(this).text() == 'Show') {
			$(this).text('Hide');
		} else {
			$(this).text('Show');
		}
		$("#xqueryx-script-source").toggle();
	});
	
	$("#toggle-javascript-script-button").click(function() {
		if ($(this).text() == 'Show') {
			$(this).text('Hide');
		} else {
			$(this).text('Show');
		}
		$("#javascript-script-source").toggle();
	});

	var xqueryAst = "";
	for (xqxId in $kyer.xqx) {
		xqueryAst = $kyer.xqx[xqxId];
	}
	$("#xqueryx-script-source").text($kyer.serialize(xqueryAst));

	var jsScript = $kyer.transform(xqueryAst, $kyer.variables['transform-xqueryx-ast-to-javascript-xsl']);

	JSLitmus.test("Parse the XQueryX from string located in script element", function(count) {
		var jsScript = "";
		while (count--) {
			jsScript = $kyer.transform(xqueryAst, $kyer.variables['transform-xqueryx-ast-to-javascript-xsl']);
		}
		$("#javascript-script-source").text($kyer.serialize(jsScript));
	});

});