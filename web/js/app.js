'use strict';


// Declare app level module which depends on filters, and services
angular.module('bestBottle', ['bestBottle.controllers']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'view/main.html', controller: 'MainController'});
        $routeProvider.when('/wine', {templateUrl: 'view/wine.html', controller: 'WineController'});
        $routeProvider.when('/beer', {templateUrl: 'view/beer.html', controller: 'BeerController'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
