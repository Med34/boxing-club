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
        .otherwise({
            redirectTo: '/home'
        });
}]);
