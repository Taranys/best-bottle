'use strict';

//Articles service used for articles REST endpoint
angular.module('BestBottle')
    .service('User', [function () {
        var User = this;

        User.setUserData = function (data) {
            User.$userInfo = data;
        };

        User.isConnected = function () {
            return angular.isDefined(User.$userInfo);
        };
    }])
    .run(['$rootScope', '$http', 'User', function ($rootScope, $http, User) {
        $rootScope.user = {
            isConnected: User.isConnected
        };

        $http.get('/users/me').success(function (info) {
            if( info !== 'null' ) {
                User.setUserData(info);
            }
        });
    }]);