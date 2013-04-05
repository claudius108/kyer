$(document).ready(function() {
	//load the menus	
	  $x.submission({
	    "ref" : "simpath:instance('menu')",
	    "resource" : "../resources/vertical-menus.xml",
	    "mode" : "synchronous",
	    "method" : "get"
	  });
});