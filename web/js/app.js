'use strict';

// Declare app level module which depends on filters, and services
angular.module('bestBottle', ['bestBottle.controllers', 'bestBottle.directives', 'ngRoute', 'ngCookies'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {templateUrl: 'view/main.html', controller: 'MainController'})
            .when('/wine', {templateUrl: 'view/wine.html', controller: 'WineController'})
            .when('/wine/new', {templateUrl: 'view/wine.html', controller: 'WineController'})
            .when('/wine/:id', {templateUrl: 'view/wine.html', controller: 'WineController'})
            .when('/beer', {templateUrl: 'view/beer.html', controller: 'BeerController'})
            .when('/beer/new', {templateUrl: 'view/beer.html', controller: 'BeerController'})
            .when('/beer/:id', {templateUrl: 'view/beer.html', controller: 'BeerController'})
            .when('/liquor', {templateUrl: 'view/liquor.html', controller: 'LiquorController'})
            .when('/liquor/new', {templateUrl: 'view/liquor.html', controller: 'LiquorController'})
            .when('/liquor/:id', {templateUrl: 'view/liquor.html', controller: 'LiquorController'})
            .when('/cocktail', {templateUrl: 'view/cocktail.html', controller: 'CocktailController'})
            .when('/cocktail/new', {templateUrl: 'view/cocktail.html', controller: 'CocktailController'})
            .when('/cocktail/:id', {templateUrl: 'view/cocktail.html', controller: 'CocktailController'})
//            .when('/search/:search', {templateUrl: 'view/search.html', controller: 'BeerController'})
            .otherwise({redirectTo: '/'});
    });