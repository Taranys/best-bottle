'use strict';

controllers.controller('HeaderController', function ($scope, $location) {
    $scope.searchValue = "";

    $scope.genericSearch = function () {
        $location.path('/search/' + $scope.searchValue);
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
});