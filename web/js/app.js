'use strict';

// Declare app level module which depends on filters, and services
angular.module('bestBottle', ['bestBottle.controllers']).
    config(["$routeProvider", "$httpProvider", function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'view/main.html', controller: 'MainController'})
            .when('/wine', {templateUrl: 'view/wine.html', controller: 'WineController'})
            .when('/wine/new', {templateUrl: 'view/beer.html', controller: 'WineController'})
            .when('/wine/:id', {templateUrl: 'view/beer.html', controller: 'WineController'})
            .when('/beer', {templateUrl: 'view/beer.html', controller: 'BeerController'})
            .when('/beer/new', {templateUrl: 'view/beer_create.html', controller: 'CreateEditBeerController'})
            .when('/beer/:id', {templateUrl: 'view/beer_create.html', controller: 'CreateEditBeerController'})
            .otherwise({redirectTo: '/'});
    }]);