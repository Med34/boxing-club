var app = angular.module('bclub', ['ngRoute']);
app.run(function ($rootScope, $location, $routeParams) {});

app.controller("HomeController", function ($scope) {
    console.log("HomeController");
});

app.controller("FindMemberController", function ($scope, $http) {
    $http.get("http://localhost:8888/findMember").then(function (response) {
        $scope.members = response.data;
    });

    // Stocke l'utilisateur.
    $scope.user = {};
    $scope.find = function (user) {
        console.log(user);
    }
    $scope.reset = function () {
        $scope.user = {};
    }
});

app.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/home', {
            controller: 'HomeController',
            templateUrl: 'templates/home.html'
        })
        .when('/findMember', {
            controller: 'FindMemberController',
            templateUrl: 'templates/findMember.html'
        })
        .otherwise({
            redirectTo: '/home'
        });

}]);
