var app = angular.module('bclub', ['ngRoute']);
app.run(function ($rootScope, $location, $routeParams) {});

app.controller("HomeController", function ($scope) {
    console.log("HomeController");
});

app.controller("ListeMembresController", function ($scope, $http) {
    $http.get("http://localhost:8888/listeMembres").then(function(response){
        $scope.membres = response.data;
    });
});

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/home', {
            controller: 'HomeController',
            templateUrl: 'templates/accueil.html'
        })
        .when('/listeMembres', {
            templateUrl: 'templates/listeMembres.html',
            controller: 'ListeMembresController'
        })
        .otherwise({
            redirectTo: '/home'
        });

}]);
