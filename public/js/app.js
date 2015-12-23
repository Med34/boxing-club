var app = angular.module('bclub', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {

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
