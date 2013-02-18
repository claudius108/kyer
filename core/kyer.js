/*
 * Kyer - data binding and templating engine
 * By Claudius Teodorescu
 * Licensed under LGPL.
 */
$(document).ready(function() {
	//check for existence of UI elements to be constructed, and
	//load all necessary data

	//construct UI elements
	for (var i = 0; (element = document.querySelectorAll("*[data-kyerType]")[i]); i++) {
		var type = element.getAttribute('data-kyerType');
		var elementId = element.id;
		element.parentNode.replaceChild($x.xpath("simpath:instance('menus')//*[@id = '" + elementId + "']")[0], element);
		document.getElementById(elementId).className = "kyer-toolbar-menu";		
		switch(type) {
			case 'context-menu':
			    $.contextMenu({
			    	"selector": "#" + document.querySelector("*[contextmenu = '" + elementId + "']").id,
			    	"items": $.contextMenu.fromMenu($('#' + elementId))
			    });
			break;
			case 'toolbar-menu':
			break;		
		}
	}	

	//select a list of all element having @ref attribute
	var oElements = document.body.querySelectorAll("*[ref]");
//	for (var i = 0, il = oElements.length; i < il; i++) {
//		var element = oElements[i]
//		, sXPathExpr = element.getAttribute("ref")
//		, oCompiledXPathExpr = $x.compile(sXPathExpr, null, 0)
//		;
//		element.value = oCompiledXPathExpr[1][0].textContent;
//		element.nXPathExprId = oCompiledXPathExpr[0];
//		element.refresh =  function() {this.value = $x.evaluate(this.nXPathExprId)[0].textContent;};
//		element.onchange = function() {$x.setvalue(sXPathExpr, "'" + this.value + "'"); kyer.refresh();};
//	}
	
		var event = document.createEvent("Event");
		event.initEvent("kyer-model-construct-done", true, true);
		document.dispatchEvent(event);

//	document.dispatchEvent(new CustomEvent("kyer-model-construct-done"));
//	var kyerModelConstructDoneEvent = document.createEvent("Event");
//	kyerModelConstructDoneEvent.initEvent("kyer-model-construct-done", true, true);


});

window.kyer = {
	"version" : "0.4",
	"utils" : {},
	"refresh" : function() {
		for (var i = 0; (element = document.body.querySelectorAll("*[ref]")[i]); i++) {
			element.refresh();
		}
	},
	"bind" : function() {
	},
	"construct" : {		
	},
	"initialize" : {
		"menu" : function(sMenuType) {
			//load annotator toolbar's xsl 
			$x.submission({
				"ref" : "simpath:instance('kyer-" + sMenuType + "-menu-xsl')",
				"resource" : kyer.utils.baseURI + "extensions/kyer-" + sMenuType + "-menu.xml",
				"mode" : "synchronous",
				"method" : "get"
			});
		}		
	}
};
//set the module's base URL
(function(sModuleName, sModuleNS) {
	var scriptUri = document.querySelector("script[src*='" + sModuleName + "']").src;
	window[sModuleNS ? sModuleNS : sModuleName].utils.baseURI = scriptUri.substring(0, scriptUri.indexOf("core/" + sModuleName + ".js"));
})('kyer');
