'use strict';

angular.module('bestBottle.i18n')
    .factory('LanguageService', ['$http', '$translate',
        function ($http, $translate) {
            return {
                getBy: function (language) {
                    if (language == undefined) {
                        language = $translate.storage().get('NG_TRANSLATE_LANG_KEY');
                    }

                    var promise = $http.get('/i18n/' + language + '.json').then(function (response) {

                        var languages = [];

                        angular.forEach(response.data.global.language, function (value, key) {
                            languages.push(key);
                        });

                        return languages;
                    });
                    return promise;
                }
            };
        }]);
