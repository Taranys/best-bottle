'use strict';

//Articles service used for articles REST endpoint
angular.module('bestBottle.beer')
    .factory('Beers', ['$resource', function ($resource) {
        return $resource('beers/:beerId', {
            beerId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);