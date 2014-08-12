'use strict';

/* App Module */

angular.module('bestBottleApp', [
    'ngResource',
    'ngRoute',
    'ngCookies',
    'bestBottle.cst',
    'bestBottle.admin',
    'bestBottle.user',
    'bestBottle.i18n',
    'bestBottle.utils',
    'bestBottle.beer',
    'http-auth-interceptor',
    'truncate'
]);

angular.module('bestBottleApp')
    .config(['$routeProvider', '$httpProvider', '$translateProvider', 'tmhDynamicLocaleProvider', 'USER_ROLES',
        function ($routeProvider, $httpProvider, $translateProvider, tmhDynamicLocaleProvider, USER_ROLES) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainController',
                    jumbo: true,
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/error', {
                    templateUrl: 'views/error.html',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .otherwise({
                    redirectTo: '/'
                });
        }])
    .run(['$rootScope', '$location', '$http', 'AuthenticationSharedService', 'Session', 'USER_ROLES',
        function ($rootScope, $location, $http, AuthenticationSharedService, Session, USER_ROLES) {
//            editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

            $rootScope.$on('$routeChangeSuccess', function (event, previous) {
                if (previous && previous.$$route && previous.$$route.jumbo) {
                    $rootScope.jumbo = previous.$$route.jumbo;
                } else {
                    $rootScope.jumbo = false;
                }
            });

            $rootScope.$on('$routeChangeStart', function (event, next) {
                $rootScope.isAuthorized = AuthenticationSharedService.isAuthorized;
                $rootScope.userRoles = USER_ROLES;
                AuthenticationSharedService.valid(next.access.authorizedRoles);
            });

            // Call when the the client is confirmed
            $rootScope.$on('event:auth-loginConfirmed', function (data) {
                $rootScope.authenticated = true;
                if ($location.path() === "/login") {
                    $location.path('/').replace();
                }
            });

            // Call when the 401 response is returned by the server
            $rootScope.$on('event:auth-loginRequired', function (rejection) {
                Session.invalidate();
                $rootScope.authenticated = false;
                if ($location.path() !== "/" && $location.path() !== "" && $location.path() !== "/register" &&
                    $location.path() !== "/activate") {
                    $location.path('/login').replace();
                }
            });

            // Call when the 403 response is returned by the server
            $rootScope.$on('event:auth-notAuthorized', function (rejection) {
                $rootScope.errorMessage = 'errors.403';
                $location.path('/error').replace();
            });

            // Call when the user logs out
            $rootScope.$on('event:auth-loginCancelled', function () {
                $location.path('');
            });
        }]);
