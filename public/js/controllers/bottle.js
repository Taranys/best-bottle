'use strict';

angular.module('BestBottle').controller('BottlesController', ['$scope', '$routeParams', '$location', 'Global', 'Beers', 'Wines', 'Bottles', function ($scope, $routeParams, $location, Global, Beers, Wines, Bottles) {
    $scope.global = Global;

    $scope.init = function() {
        Beers.query(function(beers){
            $scope.beers = beers;
        });
        Wines.query(function(wines){
            $scope.wines = wines;
        });
        Bottles.getAll().success(function(bottles){
            $scope.bottles = bottles;
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
}]);