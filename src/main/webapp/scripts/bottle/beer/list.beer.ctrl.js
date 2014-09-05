'use strict';

angular.module('bestBottle.beer')
    .controller('BeersController', ['$scope', '$localStorage', 'Beers', 'BEER',
        function ($scope, $localStorage, Beers, BEER) {

            $scope.beers = $localStorage.beers || [];

            Beers.query(function (beers) {
                $scope.beers = beers;
                $localStorage.beers = beers;
            });

            $scope.filterText = '';

            $scope.filter = {
                name: 'name',
                currentOrder: '+',
                orderFilter: '+name'
            };

            $scope.type = BEER.types;

            $scope.changeFilter = function (name) {
                var f = $scope.filter;
                // if click on selected sorter, revert order
                if (f.name === name) {
                    f.currentOrder = (f.currentOrder === '-') ? '+' : '-';
                }
                // otherwise, change sorter and restore order to default
                else {
                    f.name = name;
                    f.currentOrder = '-';
                }
                f.orderFilter = f.currentOrder + f.name;
            };

            $scope.filterBeer = function (item) {
                return ( item.name.toUpperCase().indexOf($scope.filterText.toUpperCase()) !== -1 || item.description.toUpperCase().indexOf($scope.filterText.toUpperCase()) !== -1 );
            };

            $scope.cssFilter = function () {
                return {
                    'glyphicon-sort-by-attributes': $scope.filter.currentOrder === '+',
                    'glyphicon-sort-by-attributes-alt': $scope.filter.currentOrder === '-'
                }
            };
        }]);
