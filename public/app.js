var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {

	$routeProvider
		.when('/home', {
			controller: 'HomeController',
			templateUrl: 'templates/accueil.html'
		})
		.when('/chemin', {
			templateUrl: 'templates/chemin.html',
			controller: 'CheminController'
		})
		.otherwise({
			redirectTo: '/home'
		});

}]);

app.controller('HomeController', function($scope) {
	console.log('HomeController');
});

app.controller('CheminController', function($scope) {
	console.log('CheminController');
});
