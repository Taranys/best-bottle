'use strict';

controllers.controller('BeerController', function ($scope, api) {
    $scope.beers = {};

    api.getAll('beer')
        .success(function (data) {
            $scope.beers = data.hits.hits;
        })
        .error(function (error) {
            $scope.error = error;
        });
});