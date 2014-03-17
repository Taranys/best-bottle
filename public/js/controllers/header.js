'use strict';

angular.module('BestBottle').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Beers',
        'link': 'beers'
    }, {
        'title': 'Create New Beer',
        'link': 'beers/create'
    }];
    
    $scope.isCollapsed = false;
}]);