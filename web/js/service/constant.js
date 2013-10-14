'use strict';

services.factory('constant', function ($http) {
    var constant = {};

    constant.get = function () {
        return $http.get('api/bb/constant/data_fr')
            .then(function(result){
                return  result.data._source;
            });
    };

    return constant;
});
