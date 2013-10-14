'use strict';

services.factory('Utils', function ($http) {
    var utils = {};

    utils.getLabelColor = function (rating) {
        var style = {};
        style["label-" + utils.getRatingColor(rating)] = true;
        return style;
    };

    utils.getPanelColor = function (rating) {
        var style = {};
        style["panel-" + utils.getRatingColor(rating)] = true;
        return style;
    };

    utils.getRatingColor = function (rating) {
        if (rating < 0) return "default";
        if (rating <= 1) return "danger";
        if (rating <= 2) return "warning";
        if (rating <= 3) return "info";
        if (rating <= 4) return "primary";
        if (rating <= 5) return "success";
        return "default";
    };

    utils.getDate = function (milliseconds) {
        return new Date(milliseconds).toLocaleDateString();
    };

    utils.isEmpty = function (values) {
        return angular.isArray(values) && values.length == 0;
    };

    return utils;
});
