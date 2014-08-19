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
                if (language) {
                    return "famfamfam-flag-" + language.toLowerCase();
                }
                return '';
            };

            $scope.colors = [
                { id: "WHITE", name: "global.beer.color.white" },
                { id: "YELLOW", name: "global.beer.color.yellow" },
                { id: "AMBER", name: "global.beer.color.amber" },
                { id: "BROWN", name: "global.beer.color.brown" },
                { id: "BLACK", name: "global.beer.color.black" }
            ];

            $scope.types = [
                { id: "DRAFT", name: "global.beer.type.draft", img: 'images/beers/draft.png' },
                { id: "BOTTLE", name: "global.beer.type.bottle", img: 'images/beers/bottle.png' }
            ];

            $scope.quantities = [
                { quantity: 25, label: '25cl' },
                { quantity: 50, label: '50cl' },
                { quantity: 33, label: '33cl' },
                { quantity: 37, label: '37.5cl' },
                { quantity: 100, label: '1L' }
            ];

            $scope.getColor = function () {
                for (var i = 0; i < $scope.colors.length; i++) {
                    var color = $scope.colors[i];
                    if (color.id === $scope.beer.color) {
                        return color.name;
                    }
                }
                return '';
            };

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