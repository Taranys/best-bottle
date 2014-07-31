'use strict';

//Articles service used for articles REST endpoint
angular.module('bestBottle.beer')
    .factory('Beers', ['$resource', function ($resource) {
        var Beers = $resource('app/rest/beers/:id', { id: '@id' });
        Beers.new = function () {
            return new Beers({
                name: '',
                type: 'BEER',
                description: '',
                preview: '',
                opinions: [],
                countryCode: 'FR',
                color: 'WHITE',
                rate: 0
            });
        };
        return Beers;
    }]);