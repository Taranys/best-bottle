'use strict';

//Articles service used for articles REST endpoint
angular.module('bestBottle.beer')
    .factory('Beers', ['$resource', function ($resource) {
        var Beers = $resource('app/rest/beers/:id', { id: '@id' }, {
            'addOpinion': { method: 'POST', url: 'app/rest/beers/:id/opinions' }
        });

        Beers.new = function () {
            return new Beers({
                name: '',
                description: '',
                countryCode: 'BE',
                color: 'YELLOW'
            });
        };

        Beers.newOpinion = function () {
            return {
                location: '',
                type: 'DRAFT',
                rate: -1,
                price: -1,
                quantity: 0,
                comment: ''
            };
        };

        return Beers;
    }]);