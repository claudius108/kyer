$(document).ready(function() {
	//load the menus
	  $x.submission({
	    "ref" : "simpath:instance('menu')",
	    "resource" : "../resources/toolbar-menus.xml",
	    "mode" : "synchronous",
	    "method" : "get"
	  });
});