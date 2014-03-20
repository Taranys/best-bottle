'use strict';

//Articles service used for articles REST endpoint
angular.module('BestBottle').service('Bottles', ['$http', function($http) {
    var self = this;

    self.getAll = function() {
        return $http.get("/bottles");
    };
}]);