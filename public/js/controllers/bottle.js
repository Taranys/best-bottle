'use strict';

angular.module('BestBottle').controller('BottlesController', ['$scope', '$routeParams', '$location', 'Global', 'Beers', 'Wines', function ($scope, $routeParams, $location, Global, Beers, Wines) {
    $scope.global = Global;

    $scope.init = function() {
        Beers.query(function(beers){
            $scope.beers = beers;
        });
        Wines.query(function(wines){
            $scope.wines = wines;
        });
    };
    $scope.init();

    $scope.createBeer = function(newBeer) {
        var newBeer = new Beers(newBeer);
        newBeer.$save(function() {
            $scope.init();
        });
    };

    $scope.createWine = function(newWine) {
        var newWine = new Wines(newWine);
        newWine.$save(function() {
            $scope.init();
        });
    };

    $scope.save = function(bottle) {
        bottle.$save(function() {
            $scope.init();
        });
    };

    $scope.delete = function(bottle) {
        bottle.$delete(function() {
            $scope.init();
        });
    };

//    $scope.create = function() {
//        var beer = new Beers({
//            name: this.name,
//            description: this.description
//        });
//        beer.$save(function(response) {
//            $location.path('beers/' + response._id);
//        });
//
//        this.title = '';
//        this.content = '';
//    };
//
//    $scope.remove = function(beer) {
//        if (beer) {
//            beer.$remove();
//
//            for (var i in $scope.beers) {
//                if ($scope.beers[i] === beer) {
//                    $scope.beers.splice(i, 1);
//                }
//            }
//        }
//        else {
//            $scope.beer.$remove();
//            $location.path('beers');
//        }
//    };
//
//    $scope.update = function() {
//        var beer = $scope.beer;
//        if (!beer.updated) {
//            beer.updated = [];
//        }
//        beer.updated.push(new Date().getTime());
//
//        beer.$update(function() {
//            $location.path('beers/' + beer._id);
//        });
//    };
//
//    $scope.find = function() {
//        Beers.query(function(beers) {
//            $scope.beers = beers;
//        });
//    };
//
//    $scope.findOne = function() {
//        Beers.get({
//            beerId: $routeParams.beerId
//        }, function(beer) {
//            $scope.beer = beer;
//        });
//    };
}]);