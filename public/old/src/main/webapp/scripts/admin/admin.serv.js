'use strict';

angular.module('bestBottle.admin')
    .factory('MetricsService', ['$resource',
        function ($resource) {
            return $resource('metrics/metrics', {}, {
                'get': { method: 'GET'}
            });
        }])

    .factory('ThreadDumpService', ['$http',
        function ($http) {
            return {
                dump: function () {
                    var promise = $http.get('dump').then(function (response) {
                        return response.data;
                    });
                    return promise;
                }
            };
        }])

    .factory('HealthCheckService', ['$rootScope', '$http',
        function ($rootScope, $http) {
            return {
                check: function () {
                    var promise = $http.get('health').then(function (response) {
                        return response.data;
                    });
                    return promise;
                }
            };
        }])

    .factory('LogsService', ['$resource',
        function ($resource) {
            return $resource('app/rest/logs', {}, {
                'findAll': { method: 'GET', isArray: true},
                'changeLevel': { method: 'PUT'}
            });
        }])

    .factory('AuditsService', ['$http',
        function ($http) {
            return {
                findAll: function () {
                    var promise = $http.get('app/rest/audits/all').then(function (response) {
                        return response.data;
                    });
                    return promise;
                },
                findByDates: function (fromDate, toDate) {
                    var promise = $http.get('app/rest/audits/byDates', {params: {fromDate: fromDate, toDate: toDate}}).then(function (response) {
                        return response.data;
                    });
                    return promise;
                }
            }
        }]);
