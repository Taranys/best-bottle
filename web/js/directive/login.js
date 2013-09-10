'use strict';

directives.directive('login', function (Auth, api) {
    return {
        replace: true,
        templateUrl: 'view/dialog/dialogLogin.html',
        link: function (scope) {
            $("#login").modal('hide');

            //set an function to authenticate
            scope.authenticate = function () {
                Auth.setCredentials(scope.login, scope.password);
                api.loginOk()
                    .success(function () {
                        Auth.login = scope.login;
                        $("#login").modal('hide');
                    })
                    .error(function (error) {
                        scope.loginError = "Error : " + error;
                    })
            };

            //add a function to root scope to logout
            scope.logout = function () {
                Auth.clearCredentials();
            };
        }
    }
});