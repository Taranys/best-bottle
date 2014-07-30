'use strict';

angular.module('bestBottle.utils')
    .factory('StorageService', function ($rootScope) {
        return {

            get: function (key) {
                return JSON.parse(localStorage.getItem(key));
            },

            save: function (key, data) {
                localStorage.setItem(key, JSON.stringify(data));
            },

            remove: function (key) {
                localStorage.removeItem(key);
            },

            clearAll: function () {
                localStorage.clear();
            }
        };
    });