'use strict';

angular.module('bestBottle.beer')
    .controller('BeerController', ['$scope', '$routeParams', '$location', 'Beers', '$http', 'FLAGS',
        function ($scope, $routeParams, $location, Beers, $http, FLAGS) {
            $http.get('i18n/countries/fr.json')
                .success(function (countries) {
                    $scope.countries = countries;
                })
                .error(function (error) {
                    console.error(error);
                });

            $scope.newOpinion = Beers.newOpinion();

            $scope.getFlagClass = function (language) {
                return "famfamfam-flag-" + language.toLowercase();
            };

            $scope.colors = [
                { id: "WHITE", name: "global.beer.color.white" },
                { id: "YELLOW", name: "global.beer.color.yellow" },
                { id: "AMBER", name: "global.beer.color.amber" },
                { id: "BROWN", name: "global.beer.color.brown" },
                { id: "BLACK", name: "global.beer.color.black" }
            ];

            $scope.types = [
                { id: "DRAFT", name: "global.beer.type.draft" },
                { id: "BOTTLE", name: "global.beer.type.bottle" }
            ];

            $scope.create = function () {
                $scope.beer.$save(function (response) {
                    $location.path('/beer/' + response.id);
                });
            };

            $scope.remove = function (beer) {
                if (beer) {
                    beer.$remove(function () {
                        $location.path('beers');
                    });
                }
            };

            $scope.update = function () {
                var beer = $scope.beer;
                beer.$update(function () {
                    $location.path('beer/' + beer.id);
                });
            };

            $scope.findOne = function () {
                Beers.get({ id: $routeParams.beerId }, function (beer) {
                    $scope.beer = beer;
                });
            };

            $scope.addOpinion = function (opinion) {
                Beers.addOpinion({id: $scope.beer.id }, opinion, function (beer) {
                    $scope.beer = beer;
                    $scope.displayOpinion = false;
                });
            };

            $scope.init = function () {
                if (!$routeParams.beerId) {
                    $scope.creation = true;
                    $scope.beer = Beers.new();
                } else {
                    $scope.findOne();
                }
            };
        }]);