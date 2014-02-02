angular.module('scape').directive('preview', 
		[ '$document', '$http', function($document, $http) {

	function link(scope, element, attrs) {
		var content = {}
		attrs.preview = attrs.preview || "desktop";
		
		// Create an iframe element which will contain our preview
		var iframe = document.createElement("iframe");
		$(element).append(iframe);
		
		function updatePreview() {
			var html = content.html || '';
			html = html.replace('{{> ink }}', content.css || '');
			
			var contentWindow = 
				(iframe.contentWindow) ? iframe.contentWindow : 
				(iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
			contentWindow.document.open();
			contentWindow.document.write(html);
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
		}, true);

		scope.$watch(function() { return attrs.preview }, function(value) {
			$(iframe).removeClass();
			$(iframe).addClass("preview");
			$(iframe).addClass("preview-"+attrs.preview);
		});
		
		updatePreview();
	    $.event.add(window, "load", updatePreview);
	    $.event.add(window, "resize", updatePreview);
	}
	
	return {
//		template: '<iframe style="width:100%"></iframe>'
		link: link
	};
}]);
