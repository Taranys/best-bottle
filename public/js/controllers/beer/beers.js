'use strict';

angular.module('BestBottle').controller('BeersController', ['$scope', 'Beers', function ($scope, Beers) {
    $scope.filterText = '';

    $scope.filter = {
        current : 0,
        currentOrder : '-',
        available : [{ name: 'Date', fieldName : 'created'}, {name : 'Note', fieldName : 'name'}],
        orderFilter : '+created'
    };

    $scope.changeFilter = function(index) {
        var f = $scope.filter;
        // if click on selected sorter, revert order
        if(f.current === index) {
            if( f.currentOrder === '-') {
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

    $scope.filterBeer = function(item) {
        return ( item.name.toUpperCase().indexOf($scope.filterText.toUpperCase()) !== -1 ||  item.description.toUpperCase().indexOf($scope.filterText.toUpperCase()) !== -1 );
    };

    $scope.find = function() {
        Beers.query(function(beers) {
            $scope.beers = beers;
        });
    };
}]);
