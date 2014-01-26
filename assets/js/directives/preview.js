angular.module('scape').directive('preview', 
		[ '$document', '$http', function($document, $http) {

	function link(scope, element, attrs) {
		var content = "";
		var style = "";
		
		// Create an iframe element which will contain our preview
		var iframe = document.createElement("iframe");
		$(element).append(iframe);
		$(iframe).addClass("preview");
		if (attrs.preview)
			$(iframe).addClass("preview-"+attrs.preview);
		
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
			
			var height = contentWindow.document.body.scrollHeight;
			var width = contentWindow.document.body.scrollWidth;
			$(iframe).attr("height", String(height + 16) + "px");
		};
		
		element.on('$destroy', function() {
		});

		scope.$watch(attrs.ngModel, function(value) {
			if (value) {
				content = value;
				updatePreview();
			}
		});
		
		reloadStyle();
	}
	
	return {
//		template: '<iframe style="width:100%"></iframe>'
		link: link
	};
}]);
