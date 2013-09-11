'use strict';

controllers.controller('HeaderController', function ($scope, $location, Auth) {
    $scope.searchValue = "";

    $scope.genericSearch = function () {
        $location.path('/search/' + $scope.searchValue).replace();
    };

    $scope.isActive = function (viewLocation) {
        if (viewLocation === '/') {
            return viewLocation === $location.path();
        }
        return $scope.startWith($location.path(), viewLocation);
    };

    $scope.startWith = function (string, pattern) {
        return string.indexOf(pattern) == 0;
    }

    $scope.logout = function () {
        Auth.clearCredentials();
    };

    $scope.isLogged = function () {
        return Auth.isAuthenticated;
    }

    $scope.username = function () {
        return Auth.username();
    }
});