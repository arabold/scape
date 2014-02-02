//Setting up route
angular.module('lean').config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.otherwise({
			templateUrl: 'views/index.html'
		});
}]);
