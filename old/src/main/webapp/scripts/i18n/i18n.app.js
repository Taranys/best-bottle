'use strict';

angular.module('bestBottle.i18n', [
    'bestBottle.cst',
    'ngLocale',
    'tmh.dynamicLocale',
    'pascalprecht.translate',
])
    .config(['$translateProvider', 'tmhDynamicLocaleProvider',
        function ($translateProvider, tmhDynamicLocaleProvider) {
            // Initialize angular-translate
            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/',
                suffix: '.json'
            });

            $translateProvider.preferredLanguage('fr');

            $translateProvider.useCookieStorage();

            tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js')
            tmhDynamicLocaleProvider.useCookieStorage('NG_TRANSLATE_LANG_KEY');
        }]);
