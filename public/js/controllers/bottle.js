'use strict';

angular.module('BestBottle').controller('BottlesController', ['$scope', '$routeParams', '$location', 'Global', 'Beers', 'Wines', 'Bottles', function ($scope, $routeParams, $location, Global, Beers, Wines, Bottles) {
    $scope.global = Global;
    $scope.genericSearch = '';

    //refresh view on each search change
    $scope.$watch('genericSearch', function() {
        Bottles.getAll({name : $scope.genericSearch, description : $scope.genericSearch}).success(function(bottles){
            $scope.bottles = bottles;
        });
    });

    $scope.init = function() {
        Beers.query(function(beers){
            $scope.beers = beers;
        });
        Wines.query(function(wines){
            $scope.wines = wines;
        });
        Bottles.getAll({name : $scope.genericSearch, description : $scope.genericSearch}).success(function(bottles){
            $scope.bottles = bottles;
        });
    };
    $scope.init();

    $scope.createBeer = function(newBeer) {
        var beer = new Beers(newBeer);
        beer.$save(function() {
            $scope.init();
        });
    };

    $scope.createWine = function(newWine) {
        var wine = new Wines(newWine);
        wine.$save(function() {
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