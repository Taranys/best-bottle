'use strict';

services.factory('constant', function ($http) {
    var constant = {};

    constant.get = function () {
        return $http.get('api/bb/constant/data_fr');
    };

    return constant;
});
