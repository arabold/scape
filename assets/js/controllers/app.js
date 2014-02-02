angular.module('lean').controller('AppController', ['$scope', '$window', function ($scope, $window) {
	// The app data has been injected into global scope by the underlying express layer
	$scope.app = $window.app;
}]);