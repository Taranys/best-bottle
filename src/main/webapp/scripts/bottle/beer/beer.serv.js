'use strict';

//Articles service used for articles REST endpoint
angular.module('bestBottle.beer')
    .factory('Beers', ['$resource', function ($resource) {
        var Beers = $resource('app/rest/beers/:id', { id: '@id' });
        Beers.new = function () {
            return new Beers({
                name: '',
                description: '',
                countryCode: 'FR',
                color: 'WHITE'
            });
        };
        return Beers;
    }]);