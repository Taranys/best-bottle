'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', function($scope, $http) {
    $scope.getMessage = function() {
        $http.get("api/message", {params : {who : $scope.who || "Jhon Doe"} }).success(function(data) {
            $scope.message = data;
        });
    };
  })
  .controller('MyCtrl2', [function() {

  }])
  .controller('HeaderController', ['$scope', '$location', function($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
  }])
;