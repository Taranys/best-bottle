angular.module('bestBottle.filters', [])
    .filter('btcss', function () {
        return function (input, max, prefix, reverse) {
            var coef = input / max;
            if (coef < 0) coef = 0;
            if (coef > 1) coef = 1;
            if (reverse) coef = 1 - coef;
            var key = 'danger';

            if (coef > 0.75) {
                key = 'success';
            }
            else if (coef > 0.5) {
                key = 'info';
            }
            else if (coef > 0.25) {
                key = 'warning';
            }

            var result = {};
            result[prefix + key] = true;
            return result;
        };
    });