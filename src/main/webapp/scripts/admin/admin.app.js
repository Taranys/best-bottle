'use strict';

angular.module('bestBottle.admin', [
        'ngRoute',
        'bestBottle.cst',
        'truncate'
    ])
    .config(['$routeProvider', 'USER_ROLES',
        function ($routeProvider, USER_ROLES) {
            $routeProvider
                .when('/metrics', {
                    templateUrl: 'views/admin/metrics.html',
                    controller: 'MetricsController',
                    access: {
                        authorizedRoles: [USER_ROLES.admin]
                    }
                })
                .when('/logs', {
                    templateUrl: 'views/admin/logs.html',
                    controller: 'LogsController',
                    resolve: {
                        resolvedLogs: ['LogsService', function (LogsService) {
                            return LogsService.findAll();
                        }]
                    },
                    access: {
                        authorizedRoles: [USER_ROLES.admin]
                    }
                })
                .when('/audits', {
                    templateUrl: 'views/admin/audits.html',
                    controller: 'AuditsController',
                    access: {
                        authorizedRoles: [USER_ROLES.admin]
                    }
                })
                .when('/docs', {
                    templateUrl: 'views/admin/docs.html',
                    access: {
                        authorizedRoles: [USER_ROLES.admin]
                    }
                });
            //            .when('/tracker', {
//                templateUrl: 'views/admin/tracker.html',
//                controller: 'TrackerController',
//                access: {
//                    authorizedRoles: [USER_ROLES.admin]
//                }
//            });
        }]);