'use strict';

angular.module('BestBottle').controller('BeerController', ['$scope', '$routeParams', '$location', 'Beers', function ($scope, $routeParams, $location, Beers) {

    $scope.create = function() {
        $scope.beer.$save(function(response) {
            $location.path('/beer/' + response._id);
        });
    };

    $scope.remove = function(beer) {
        if (beer) {
            beer.$remove(function(){
                $location.path('beers');
            });
        }
    };

    $scope.update = function() {
        var beer = $scope.beer;
        if (!beer.updated) {
            beer.updated = [];
        }
        beer.updated.push(new Date().getTime());

        beer.$update(function() {
            $location.path('beers/' + beer._id);
        });
    };

    $scope.findOne = function() {
        Beers.get({ beerId: $routeParams.beerId }, function(beer) {
            $scope.beer = beer;
        });
    };

    $scope.init = function() {
        if( ! $routeParams.beerId ) {
            $scope.beer = new Beers();
        } else {
            $scope.findOne();
        }
    };
}]);