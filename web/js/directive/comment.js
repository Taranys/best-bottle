'use strict';

directives.directive('commentList', function () {
    return {
        replace:false,
        transclude:false,
        restrict:'A',
        templateUrl:'view/comments.html',
        scope:{
            "comments":"="
        },
        link:function ($scope) {
            $scope.getMapUrl = function (str) {
                if (str) {
                    var pattern = 'https://www.google.fr/maps?q=';
                    return pattern + encodeURIComponent(str);
                }
                return "";
            };
        }
    };
});