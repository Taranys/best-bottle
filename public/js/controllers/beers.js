'use strict';

angular.module('BestBottle').controller('BeersController', ['$scope', '$routeParams', '$location', 'Global', 'Beers', function ($scope, $routeParams, $location, Global, Beers) {
    $scope.global = Global;

    $scope.create = function() {
        var beer = new Beers({
            name: this.name,
            description: this.description
        });
        beer.$save(function(response) {
            $location.path('beers/' + response._id);
        });

        this.title = '';
        this.content = '';
    };

    $scope.remove = function(beer) {
        if (beer) {
            beer.$remove();

            for (var i in $scope.beers) {
                if ($scope.beers[i] === beer) {
                    $scope.beers.splice(i, 1);
                }
            }
        }
        else {
            $scope.beer.$remove();
            $location.path('beers');
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

    $scope.find = function() {
        Beers.query(function(beers) {
            $scope.beers = beers;
        });
    };

    $scope.findOne = function() {
        Beers.get({
            beerId: $routeParams.beerId
        }, function(beer) {
            $scope.beer = beer;
        });
    };
}]);