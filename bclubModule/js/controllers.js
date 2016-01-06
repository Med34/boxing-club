angular.module('bclub').controller("HomeController", function ($scope) {
    console.log("HomeController");
});

angular.module('bclub').controller("FindMemberController", function ($scope, $http) {
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

angular.module('bclub').controller("LocalizeMemberController", function($scope, $http){
    
});
