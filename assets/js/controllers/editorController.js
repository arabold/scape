angular.module('scape').controller('EditorController', 
		[ '$scope', '$http', function($scope, $http) {

	var _codeMirror;
	
	$scope.template = '/lib/ink/templates/base/basic.html';
	$scope.styleSheet = '/lib/ink/css/ink.css';
	$scope.preview = "desktop";
	$scope.editorOptions = {
//		    styleActiveLine: true,
//		    showTrailingSpace: true,
			viewportMargin: Infinity,
//			readOnly: 'nocursor',
			lineWrapping : true,
			lineNumbers: true,
			mode: 'text/html',
//			autofocus: true,
			onLoad: function(_cm) {
				_codeMirror = _cm;
			}
	};
	$scope.htmlContent = "";
//	$scope.$watch('htmlContent', function() {
//		// Handle changes to the HTML content
//	});
	
	$scope.switchPreview = function(preview) {
		$scope.preview = preview;
	}

	// Load the template
	$http.get($scope.template).then(function(response) {
		$scope.htmlContent = response.data;
	});
	
}]);
