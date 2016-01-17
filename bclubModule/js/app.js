var app = angular.module('bclub', ['ngRoute']);
app.run(function ($rootScope, $location, $routeParams) {});

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
        .when('/localizeMembers', {
            controller: 'LocalizeMemberController',
            templateUrl: 'templates/localizeMembers.html'
        })
        .when('/display3D', {
            controller: '3DController',
            templateUrl: 'templates/display3D.html'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);
