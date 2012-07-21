/*
 * Kyer - data binding, templating and manipulation engine
 * By Claudius Teodorescu
 * Licensed under LGPL.
 */

/**
 * @author <a href="mailto:claudius.teodorescu@gmail.com">Claudius Teodorescu</a>
 * @version 1.0
 */

	/**
	 * Kyer - data binding, templating and manipulation engine.
	 * @class $kyer
	 * @return Document
	 */
	
window.$kyer = {
	"version" : "1.0",
	"utils" : {},

	"parseXqueryxScripts" : function() {
		var scriptElements = document.querySelectorAll("script[type = 'application/xquery+xml']");
		for (var i = 0, il = scriptElements.length; i < il; i++) {
			var scriptElement = scriptElements[i];
			if (scriptElement.hasAttribute("src")) {
				var xhReq = new XMLHttpRequest();
				xhReq.open("get", scriptElement.getAttribute("src"), oAjaxOptions.mode);
				
				//alert(scriptElement.getAttribute("src"));
				//alert(scriptElement.textContent);				
			}
		}
	},
	"_parseXqueryxScriptByContent" : function() {
		
		
	},
	"_parseXqueryxScriptBySrc" : function() {
		
		
	}	
};

	/**
	 * Parses the XQueryX scripts that are inline in a HTML script element, or online (retrieved using the @src of a HTML script element).
	 * @class _parseXqueryxScripts
	 * @return Document
	 */
$kyer._parseXqueryxScripts();

var oHead = document.getElementsByTagName('head').item(0);
var oScript= document.createElement("script");
oScript.type = "text/xml";
oScript.src="../../data/xqueryx/hamlet-xqx.xml";
oHead.appendChild( oScript);

