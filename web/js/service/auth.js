'use strict';

services.factory('Auth', function (Base64, $cookieStore, $http) {
    // initialize to whatever is in the cookie, if anything
    $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookieStore.get('authdata');
    // hack to avoid browser automatic connection
    $http.defaults.headers.common['X-StatusOnLoginFail'] = '418';

    var auth = {
        login: ""
    };

    auth.setCredentials = function (username, password) {
        var encoded = Base64.encode(username + ':' + password);
        $http.defaults.headers.common.Authorization = 'Basic ' + encoded;
        $cookieStore.put('authdata', encoded);
    };

    auth.clearCredentials = function () {
        document.execCommand("ClearAuthenticationCache");
        $cookieStore.remove('authdata');
        $http.defaults.headers.common.Authorization = 'Basic ';
        auth.login = "";
    };

    auth.isAuthenticated = function () {
        return auth.login != "";
    }

    return auth;
});