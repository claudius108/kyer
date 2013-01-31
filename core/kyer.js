/*
 * Kyer - data binding and templating engine
 * By Claudius Teodorescu
 * Licensed under LGPL.
 */
$(document).ready(function() {
	//check for existence of UI elements to be constructed, and
	//load all necessary data
	kyer.initialize.menu('context');

	//construct UI elements
	$("*[data-kyerType]").each(function(index) {
		var element = $(this);
		var type = element.attr('data-kyerType');
		var elementId  = element.attr('id');
		element.replaceWith($x.serializeToString($x.xpath("simpath:instance('menus')//*[@id = '" + elementId + "']")[0]));		
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
	});

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
	"version" : "0.3",
	"utils" : {},
	"refresh" : function() {
		for (var i = 0; (element = document.body.querySelectorAll("*[ref]")[i]); i++) {
			element.refresh();
		}
	},
	"bind" : function() {
	},
	"construct" : {
		"menu" : function(oMenuElement) {
			//get the menu type
			var sMenuType = oMenuElement.getAttribute('type');
			//process oMenuElement
			if (oMenuElement.nodeType == 1) {
				var sMenuElement = $x.serializeToString(oMenuElement).replace(/xmlns="http:\/\/www.w3.org\/1999\/xhtml"/, "")
				, sPrefix = sMenuElement.substring(1, sMenuElement.indexOf(':'))
				, sNSs = $x.utils.sNSs
				, sNS = sNSs.substring(sNSs.indexOf("xmlns:" + sPrefix + "=\""))
				;
				sNS = sNS.substring(0, sNS.indexOf(" "));
				oMenuElement = $x.parseFromString(sMenuElement);
			}
			return $x.transform(oMenuElement, $x._instances['kyer-' + sMenuType + '-menu-xsl']).documentElement;
		}
		
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
