'use strict';

angular.module('bestBottle.beer')
    .controller('BeersController', ['$scope', 'Beers', 'BEER',
        function ($scope, Beers, BEER) {
            $scope.filterText = '';

            $scope.filter = {
                current: 0,
                currentOrder: '-',
                available: [
                    { name: 'Name', fieldName: 'name'},
                    { name: 'Date', fieldName: 'lastModified'},
                    { name: 'Note Pression', fieldName: 'draftRate'},
                    { name: 'Note Bouteille', fieldName: 'bottleRate'}
                ],
                orderFilter: '+name'
            };

            $scope.type = BEER.types;

            $scope.changeFilter = function (index) {
                var f = $scope.filter;
                // if click on selected sorter, revert order
                if (f.current === index) {
                    if (f.currentOrder === '-') {
                        f.currentOrder = '+';
                    } else {
                        f.currentOrder = '-';
                    }
                }
                // otherwise, change sorter and restore order to default
                else {
                    f.current = index;
                    f.currentOrder = '-';
                }
                f.orderFilter = f.currentOrder + f.available[index].fieldName;
            };

            $scope.filterBeer = function (item) {
                return ( item.name.toUpperCase().indexOf($scope.filterText.toUpperCase()) !== -1 || item.description.toUpperCase().indexOf($scope.filterText.toUpperCase()) !== -1 );
            };

            $scope.find = function () {
                Beers.query(function (beers) {
                    $scope.beers = beers;
                });
            };
        }]);
