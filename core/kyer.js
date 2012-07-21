/*
 * Kyer - data binding and templating engine
 * By Claudius Teodorescu
 * Licensed under LGPL.
 */
$(document).ready(function() {

	//check for existence of UI elements to be constructed, and
	//load all necessary data
	kyer.initialize.menu('toolbar');
	kyer.initialize.menu('context');

	//construct UI elements
	$("*[appearance^='kyer-']").each(function(index) {
		var element = $(this);
		element.replaceWith($x.serializeToString(kyer.construct.menu($x.xpath("simpath:instance('menus')//kyer:menu[@id = '" + element.attr('id') + "']")[0])));
	});
	
	var contextMenu = $("*[appearance='kyer-context-menu']");
	
	$(contextMenu.attr('container')).contextMenu(
		{
			menu: "context-items-for-" + contextMenu.attr('id')
		}
	);	
	
	$(".fg-button:not(.ui-state-disabled)")
		.hover(
			function(){ 
				$(this).addClass("ui-state-hover"); 
			},
			function(){ 
				$(this).removeClass("ui-state-hover"); 
			}
		)
		.mousedown(
			function(){
				$(this).parents('.fg-buttonset-single:first').find(".fg-button.ui-state-active").removeClass("ui-state-active");
				if( $(this).is('.ui-state-active.fg-button-toggleable, .fg-buttonset-multi .ui-state-active') ){ $(this).removeClass("ui-state-active"); }
				else { $(this).addClass("ui-state-active"); }	
			}
		)
		.mouseup(
			function(){
				if(! $(this).is('.fg-button-toggleable, .fg-buttonset-single .fg-button,  .fg-buttonset-multi .fg-button') ){
					$(this).removeClass("ui-state-active");
				}
			}
		);
		// var content = $("#teian-toolbar");
		//     var eventSource = $("<div></div>");
		//     $("body").append(eventSource);
		//     
		//     eventSource.css({
		//         position: "absolute",
		//         left: content.offset().left,
		//         top: content.offset().top,
		//         width: content.width(),
		//         height: content.height(),
		//         opacity: 1,
		//         "z-index": 999,
		//     }).mouseenter(function(e){
		//         output.text("I'm in!");
		//     }).mouseout(function(e) {
		//         output.text("I'm out!");
		//     });
		$('.kyer-dd-menu-options-set').hover(function(){}, function(){$(this).fadeOut();});
	

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
	},
	"ui" : {
		"fadeOut" : function(oElement) {
			this.oElement = oElement;
			setTimeout(function() {oElement.style.display = 'none';}, 3000);
// 			oElement.style.display = 'none';
		}
	}
};
//set the module's base URL
(function(sModuleName, sModuleNS) {
	window[sModuleNS ? sModuleNS : sModuleName].utils.baseURI = document.querySelector("script[src*='" + sModuleName + "']").src.match(new RegExp("^(.)*(/)?" + sModuleName + "/"))[0];
})('kyer');

			//process menu element
// 			var oMenuElementHTMLMarkup = $("<div/>", {"class" : "fg-toolbar ui-widget-header ui-corner-all ui-helper-clearfix", "id" : oMenuElement.attr('id'), "appearance" : "kyer menu"});
// 			oMenuElement.children().each(function(index) {
// 				var oOptionset = $(this)
// 				, sOptionsetSelection = oOptionset.attr('selection') ? oOptionset.attr('selection') : 'none'
// 				, sOptionsetType = oOptionset.attr('type') ? oOptionset.attr('type') : 'horizontal'
// 				, sOptionsetClassList = 'fg-buttonset ui-helper-clearfix'
// 				;
// 				//process option set class list based upon option set's selection attribute
// 				switch(sOptionsetSelection) {
// 					case 'single':
// 						sOptionsetClassList += ' fg-buttonset-single';
// 					break;
// 				}
// 				//process option set class list based upon option set's type attribute
// 				switch(sOptionsetType) {
// 					case 'drop-down':
// 						sOptionsetClassList += ' teian-dd-menu';
// 					break;
// 				}
// 				//insert the option set's container
// 				var oHTMLOptionset = $("<div/>", {"id" : oOptionset.attr('id') ? oOptionset.attr('id') : $.now(), "class" : sOptionsetClassList}).appendTo(oMenuElementHTMLMarkup)
// 				;
// // 				alert($x.serializeToString(oOptionset[0]));
// 				//process option elements based upon option set's type attribute
// 				switch(sOptionsetType) {
// 					case 'drop-down':
// 						var oDDMbutton = $("<button class=\"teian-dd-menu-button fg-button ui-state-default ui-priority-primary ui-corner-all\">" + oOptionset.children(":first").text() + "</button>").appendTo(oHTMLOptionset)
// 						, oOptionContainer = $("<div class=\"teian-dd-menu-options-container\"><div class=\"teian-dd-menu-options-set ui-widget-header ui-corner-all ui-helper-clearfix\"></div></div>").appendTo(oHTMLOptionset).children(":first")
// 						;
// 						oHTMLOptionset.click(function(){$('#' + $(this).attr('id') + ' .kyer-dd-menu-options-set').fadeIn();}, function(){});
// 						$($x.xpath("/kyer:optionset/kyer:option", oOptionset[0])).each(function(index) {
// 							var oOption = $(this)
// 							;
// // // 							alert($x.serializeToString(oOption[0]));
// // 							alert(oOption.children(":first").text());
// // 							$("<button id=\"" + oOption.attr('id') + "\" onclick=\"" + oOption.attr('command') + "\" title=\"" + oOption.attr('title') + "\" appearance=\"" + oOption.attr('appearance') + "\" class=\"fg-button ui-state-default ui-priority-primary ui-corner-all\">" + oOption.children(":first").html() + "</button>").appendTo(oOptionContainer);
// 						});
// 					break;
// 					case 'horizontal':
// 						oOptionset.children().each(function(index) {
// 							var oOption = $(this)
// 							;
// // 							$("<button id=\"" + oOption.attr('id') + "\" onclick=\"" + oOption.attr('command') + "\" title=\"" + oOption.attr('title') + "\" appearance=\"" + oOption.attr('appearance') + "\" class=\"fg-button ui-state-default ui-priority-primary ui-corner-all\">" + oOption.children(":first").html() + "</button>").appendTo(oHTMLOptionset);
// 						});
// 					break;
// 				}
// 				//process option elements based upon option set's type attribute
// 				switch(sOptionsetSelection) {
// 					case 'single':
// 						oHTMLOptionset.children(":first").addClass('ui-state-active ui-corner-left');
// 						oHTMLOptionset.children().removeClass('ui-corner-all');
// 						oHTMLOptionset.children(":last").addClass('ui-corner-right');
// 					break;
// 				}
// 			});