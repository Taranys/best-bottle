'use strict';

angular.module('bestBottle.user', [
        'ngRoute',
        'bestBottle.cst',
        'truncate'
    ])
    .config(['$routeProvider', 'USER_ROLES',
        function ($routeProvider, USER_ROLES) {
            $routeProvider
                .when('/register', {
                    templateUrl: 'views/user/register.html',
                    controller: 'RegisterController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/activate', {
                    templateUrl: 'views/user/activate.html',
                    controller: 'ActivationController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/login', {
                    templateUrl: 'views/user/login.html',
                    controller: 'LoginController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/settings', {
                    templateUrl: 'views/user/settings.html',
                    controller: 'SettingsController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/password', {
                    templateUrl: 'views/user/password.html',
                    controller: 'PasswordController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/sessions', {
                    templateUrl: 'views/user/sessions.html',
                    controller: 'SessionsController',
                    resolve: {
                        resolvedSessions: ['Sessions', function (Sessions) {
                            return Sessions.get();
                        }]
                    },
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
                .when('/logout', {
                    templateUrl: 'views/main.html',
                    controller: 'LogoutController',
                    access: {
                        authorizedRoles: [USER_ROLES.all]
                    }
                })
        }]);