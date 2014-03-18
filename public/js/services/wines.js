'use strict';

//Articles service used for articles REST endpoint
angular.module('BestBottle').factory('Wines', ['$resource', function($resource) {
    return $resource('wines/:wineId', {
        beerId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);