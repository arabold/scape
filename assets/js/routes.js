//Setting up route
angular.module('scape').config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.otherwise({
			templateUrl: 'views/index.html'
		});
}]);
