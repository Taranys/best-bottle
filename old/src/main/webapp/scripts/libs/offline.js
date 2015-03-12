'use strict';

angular.module('offline', []).service('OfflineService', [ '$rootScope', '$interval', '$http',
        function ($rootScope, $interval, $http) {
            var self = this;

            self.OFFLINE = true;
            self.ONLINE = false;

            //ping server to check the availability
            self.ping = function () {
                if (self.force) return;

                $http.get('health', {timeout: 3000})
                    .success(function () {
                        self.setMode(self.ONLINE);
                    })
                    .error(function () {
                        self.setMode(self.OFFLINE);
                    });
            };

            //true by default until we confirm server connexion
            self.offline = true;
            self.force = false;
            self.ping();

            self.isOffline = function () {
                if (self.force) return true;
                return self.offline;
            };

            self.isForced = function () {
                return self.force;
            };

            self.setMode = function (isOffline) {
                if (isOffline != self.offline) {
                    self.offline = isOffline;

                    //come back to online state
                    if (isOffline == false) {
                        $rootScope.$emit('event:onlineActivated');
                    } else {
                        $rootScope.$emit('event:offlineActivated');
                    }
                }
            };

            self.setForce = function (isForcedOffline) {
                self.force = isForcedOffline;
                if (!isForcedOffline) {
                    self.setMode(self.OFFLINE);
                    self.ping();
                }
            };

            //execute a ping every 2s
            $interval(self.ping, 5000);
        }])
    .run(['OfflineService', '$rootScope', function (OfflineService, $rootScope) {
        // start
        $rootScope.isOffline = function () {
//            return true;
            return OfflineService.offline;
        }
    }]);
