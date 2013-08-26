'use strict';

directives.directive('autoComplete', function ($timeout) {
    return function (scope, element, attrs) {
        element.autocomplete({
            minLength: 1,
            source: function (request, response) {
                var matcher = new RegExp($.ui.autocomplete.escapeRegex(request.term), "i");
                var mapper = $.map(scope[attrs.uiItems], function (item) {
                    return {
                        label: item
                    };
                });
                response($.grep(mapper, function (value) {
                    return matcher.test(value.label);
                })
                );
            }
//            select: function (event, ui) {
//                $timeout(function () {
//                    element.trigger('input');
//                }, 0);
//
//                if (attrs.updateModelOnSelect) {
//                    scope.$apply(function () {
//                        scope[attrs.updateModelOnSelect] = ui.item.label;
//                    });
//                }
//            }
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            return $("<li>")
                .append("<a>" + item.label + "</a>")
                .appendTo(ul);
        };
        ;
    };
});