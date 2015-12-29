var app = angular.module('bclub', ['ngRoute']);
app.run(function ($rootScope, $location, $routeParams) {});

app.controller("HomeController", function ($scope) {
    console.log("HomeController");
});

app.controller("FindMemberController", function ($scope, $http) {
    $http.get("http://localhost:8888/findMember").then(function (response) {
        $scope.mapJSON = response.data;
    });

    // Stocke l'utilisateur.
    $scope.user = {};
    $scope.find = function (user) {
        $http.get("http://localhost:8888/listMembers", {
            params: user
        }).then(function (response) {
            $scope.members = response.data;
        });
    }
    $scope.reset = function () {
        $scope.user = {};
        $scope.members = null;
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
