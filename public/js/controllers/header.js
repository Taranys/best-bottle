'use strict';

angular.module('BestBottle').controller('HeaderController', ['$scope', function ($scope) {
    $scope.menu = [{
        'title': 'Beers',
        'link': 'beers'
    }, {
        'title': 'Create New Beer',
        'link': 'beers/create'
    }];
    
    $scope.isCollapsed = false;
}]);