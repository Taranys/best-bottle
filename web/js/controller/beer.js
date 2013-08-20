'use strict';

controllers.controller('BeerController', function ($scope, Elastic) {
    $scope.beers = {};

    Elastic.getAll('beer',
        function success(data) {
            $scope.beers = data;
        },
        function error(data) {
            $scope.error = data;
        });
});