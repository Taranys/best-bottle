'use strict';

angular.module('BestBottle', ['ngCookies', 'ngResource', 'ngRoute']);

//Setting up route
angular.module('BestBottle').config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/beers',{ controller : 'BeersController', templateUrl : 'views/beers/list.html' })
        .when('/beers/create',{ controller : 'BeersController', templateUrl : 'views/beers/create.html' })
        .when('/beers/:beerId/edit',{ controller : 'BeersController', templateUrl : 'views/beers/edit.html' })
        .when('/beers/:beerId',{ controller : 'BeersController', templateUrl : 'views/beers/view.html' })
        .otherwise('/');
}
]);

//Setting HTML5 Location Mode
angular.module('BestBottle').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
