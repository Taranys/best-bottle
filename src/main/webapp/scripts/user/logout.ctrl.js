'use strict';

angular.module('bestBottle.user')
    .controller('LogoutController', ['$location', 'AuthenticationSharedService',
        function ($location, AuthenticationSharedService) {
            AuthenticationSharedService.logout();
        }]);
