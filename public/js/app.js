'use strict';

angular.module('BestBottle', ['ngCookies', 'ngResource', 'ngRoute', 'mgcrea.ngStrap', 'xeditable']);

//Setting up route
angular.module('BestBottle').config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/',{ templateUrl : 'views/index.html' })
        .when('/bottles',{ controller : 'BottlesController', templateUrl : 'views/bottles.html' })
        .when('/beers',{ controller : 'BeersController', templateUrl : 'views/beers/list.html' })
        .when('/beers/create',{ controller : 'BeersController', templateUrl : 'views/beers/create.html' })
        .when('/beers/:beerId/edit',{ controller : 'BeersController', templateUrl : 'views/beers/edit.html' })
        .when('/beers/:beerId',{ controller : 'BeersController', templateUrl : 'views/beers/view.html' })
        .otherwise('/');
}
]);

angular.module('BestBottle').run(function(editableOptions) {
    editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

//Setting HTML5 Location Mode
angular.module('BestBottle').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
