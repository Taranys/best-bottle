'use strict';

angular.module('bestBottle.beer', [
    'bestBottle.cst',
    'ui.bootstrap'
])
    .config(['$routeProvider', 'USER_ROLES',
        function ($routeProvider, USER_ROLES) {
            $routeProvider
                .when('/beers', {
                    controller: 'BeersController',
                    templateUrl: 'views/beers/beerlist.html',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/beer/create', {
                    controller: 'BeerController',
                    templateUrl: 'views/beers/beeredit.html',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/beer/:beerId/edit', {
                    controller: 'BeerController',
                    templateUrl: 'views/beers/beeredit.html',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/beer/:beerId', {
                    controller: 'BeerController',
                    templateUrl: 'views/beers/beerview.html',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
        }]);