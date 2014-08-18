'use strict';

angular.module('bestBottle.i18n')
    .controller('LanguageController', ['$scope', '$translate', 'LanguageService', 'FLAGS',
        function ($scope, $translate, LanguageService, FLAGS) {
            $scope.getFlagClass = function (language) {
                var selectedFlag = "";
                angular.forEach(FLAGS, function (flag, flagLanguage) {
                    if (language.toLowerCase() == flagLanguage.toLowerCase()) {
                        selectedFlag = flag;
                    }
                });

                if (selectedFlag === "") {
                    selectedFlag = language.toLowerCase();
                }

                return "famfamfam-flag-" + selectedFlag;
            };

            $scope.changeLanguage = function (languageKey) {
                $translate.use(languageKey);

                LanguageService.getBy(languageKey).then(function (languages) {
                    $scope.languages = languages;
                });
            };

            LanguageService.getBy().then(function (languages) {
                $scope.languages = languages;
            });
        }]);