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
                })
                .when('/tracker', {
                    templateUrl: 'views/admin/tracker.html',
                    controller: 'TrackerController',
                    access: {
                        authorizedRoles: [USER_ROLES.admin]
                    }
                });
        }])
    .run(['$rootScope', '$route',
        function ($rootScope, $route) {
            // This uses the Atmoshpere framework to do a Websocket connection with the server, in order to send
            // user activities each time a route changes.
            // The user activities can then be monitored by an administrator, see the views/tracker.html Angular view.

            $rootScope.websocketSocket = atmosphere;
            $rootScope.websocketSubSocket;
            $rootScope.websocketTransport = 'websocket';

            $rootScope.websocketRequest = { url: 'websocket/activity',
                contentType: "application/json",
                transport: $rootScope.websocketTransport,
                trackMessageLength: true,
                reconnectInterval: 5000,
                enableXDR: true,
                timeout: 60000 };

            $rootScope.websocketRequest.onOpen = function (response) {
                $rootScope.websocketTransport = response.transport;
                $rootScope.websocketRequest.sendMessage();
            };

            $rootScope.websocketRequest.onClientTimeout = function (r) {
                $rootScope.websocketRequest.sendMessage();
                setTimeout(function () {
                    $rootScope.websocketSubSocket = $rootScope.websocketSocket.subscribe($rootScope.websocketRequest);
                }, $rootScope.websocketRequest.reconnectInterval);
            };

            $rootScope.websocketRequest.onClose = function (response) {
                if ($rootScope.websocketSubSocket) {
                    $rootScope.websocketRequest.sendMessage();
                }
            };

            $rootScope.websocketRequest.sendMessage = function () {
                if ($rootScope.websocketSubSocket.request.isOpen) {
                    $rootScope.websocketSubSocket.push(atmosphere.util.stringifyJSON({
                            userLogin: $rootScope.login,
                            page: $route.current.templateUrl}
                    ));
                }
            };

            $rootScope.websocketSubSocket = $rootScope.websocketSocket.subscribe($rootScope.websocketRequest);

            $rootScope.$on("$routeChangeSuccess", function (event, next, current) {
                $rootScope.websocketRequest.sendMessage();
            });
        }
    ]);