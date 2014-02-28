'use strict';

angular.module('bestBottleApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
