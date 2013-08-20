'use strict';


// Declare app level module which depends on filters, and services
angular.module('bestBottle', ['bestBottle.controllers']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'view/main.html', controller: 'MainController'});
        $routeProvider.when('/wine', {templateUrl: 'view/wine.html', controller: 'WineController'});
        $routeProvider.when('/wine/new', {templateUrl: 'view/beer.html', controller: 'WineController'});
        $routeProvider.when('/wine/:id', {templateUrl: 'view/beer.html', controller: 'WineController'});
        $routeProvider.when('/beer', {templateUrl: 'view/beer.html', controller: 'BeerController'});
        $routeProvider.when('/beer/new', {templateUrl: 'view/beer_create.html', controller: 'CreateBeerController'});
        $routeProvider.when('/beer/:id', {templateUrl: 'view/beer.html', controller: 'BeerController'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
