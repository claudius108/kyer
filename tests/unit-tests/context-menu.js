$(document).ready(function() {
	//load the menus
	  $x.submission({
	    "ref" : "simpath:instance('menu')",
	    "resource" : "../resources/context-menus.xml",
	    "mode" : "synchronous",
	    "method" : "get"
	  });
});