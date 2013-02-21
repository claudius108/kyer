$(document).ready(function() {
	//load the menus	
	  $x.submission({
	    "ref" : "simpath:instance('vertical-menus')",
	    "resource" : "../resources/vertical-menus.xml",
	    "mode" : "synchronous",
	    "method" : "get"
	  });

	var oIterationNOs = {1 : 1}
	, sResult
	, nIterationNo
	;
	//oIterationNOs = {1 : 1, 10 : 1, 100 : 1, 1000 : 1};
	for (nIterationNo in oIterationNOs) {
		var start = new Date().getTime();
		for ( var i = 0, il = nIterationNo; i < il; i++ ) {
			//sResult = $x.serializeToString($x.instance('xml').root.childNodes[0].childNodes[1]);
		}
		//$("<tr/>", {"html" : "<td>Average time for " + nIterationNo + " run(s) (ms): " + ( ( new Date()).getTime() -start ) / nIterationNo + "</td>"}).appendTo("#results-1 table");
	}
	//$("#results-1 div").text(sResult);

});