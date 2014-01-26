angular.module('scape').directive('preview', 
		[ '$document', '$http', function($document, $http) {

	function link(scope, element, attrs) {
		var content = "";
		var style = "";
		attrs.preview = attrs.preview || "desktop";
		
		// Create an iframe element which will contain our preview
		var iframe = document.createElement("iframe");
		$(element).append(iframe);
		
		function reloadStyle() {
			$http.get('/lib/ink/css/ink.css').then(function(response) {
				style = response.data;
				updatePreview();
			});
		}
		
		function updatePreview() {
			var formatted = content;
//			formatted = formatted.replace('href="ink.css"', 'href="/lib/ink/css/ink.css"');
//			formatted = formatted.replace('{{> ink }}', '<link rel="stylesheet" type="text/css" href="/lib/ink/css/ink.css">')
			formatted = formatted.replace('{{> ink }}', style);
			
			var contentWindow = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
			contentWindow.document.open();
			contentWindow.document.write(formatted);
			contentWindow.document.close();
			
			// the iframe should size according to its content
			var height = contentWindow.document.body.scrollHeight;
			var width = contentWindow.document.body.scrollWidth;
			$(iframe).attr("height", String(height + 16) + "px");
		};
		
		element.on('$destroy', function() {
		});

		scope.$watch(attrs.ngModel, function(value) {
			content = value;
			updatePreview();
		});

		scope.$watch(function() { return attrs.preview }, function(value) {
			$(iframe).removeClass();
			$(iframe).addClass("preview");
			$(iframe).addClass("preview-"+attrs.preview);
		});
		
		reloadStyle();
	    $.event.add(window, "load", reloadStyle);
	    $.event.add(window, "resize", reloadStyle);
	}
	
	return {
//		template: '<iframe style="width:100%"></iframe>'
		link: link
	};
}]);
