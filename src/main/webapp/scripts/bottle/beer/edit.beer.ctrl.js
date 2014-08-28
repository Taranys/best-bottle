'use strict';

angular.module('bestBottle.beer')
    .controller('BeerController', ['$scope', '$routeParams', '$location', 'Beers', '$http', '$sce', 'FLAGS',
        function ($scope, $routeParams, $location, Beers, $http, $sce, FLAGS) {
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

            $scope.types = {
                DRAFT: { name: "global.beer.type.draft", img: 'images/beers/draft.png' },
                BOTTLE: { name: "global.beer.type.bottle", img: 'images/beers/bottle.png' }
            };

            $scope.quantities = [
                { quantity: 25, label: '25cl' },
                { quantity: 50, label: '50cl' },
                { quantity: 33, label: '33cl' },
                { quantity: 37, label: '37.5cl' },
                { quantity: 100, label: '1L' }
            ];

            $scope.getColor = function () {
                if (!$scope.beer) {
                    return '';
                }
                for (var i = 0; i < $scope.colors.length; i++) {
                    var color = $scope.colors[i];
                    if (color.id === $scope.beer.color) {
                        return color.name;
                    }
                }
                return '';
            };

            $scope.hasRate = function () {
                if (!$scope.beer) {
                    return false;
                }
                return $scope.beer.draftRate != -1 || $scope.beer.bottleRate != -1;
            };

            $scope.geolocAllowed = !!navigator.geolocation;
            $scope.getLocation = function () {
                navigator.geolocation.getCurrentPosition(function (position) {
                    $scope.$apply(function () {
                        $scope.newOpinion.location = position.coords.latitude + "," + position.coords.longitude;
                    });
                });
            };

            $scope.create = function () {
                $scope.saveOnGoing = true;
                var test = $scope.beer.$save(function (response) {
                    $location.path('/beer/' + response.id);
                }).finally(function () {
                        $scope.saveOnGoing = false;
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
                $scope.saveOnGoing = true;
                beer.$update(function () {
                    $location.path('beer/' + beer.id);
                }).finally(function () {
                        $scope.saveOnGoing = false;
                    });
            };

            $scope.getDescription = function () {
                if ($scope.beer && $scope.beer.description) {
                    return $sce.trustAsHtml($scope.beer.description.split('\n').join('<br>')) || 'No description';
                }
                return "";
            };


            $scope.findOne = function () {
                Beers.get({ id: $routeParams.beerId }, function (beer) {
                    $scope.beer = beer;
                });
            };

            $scope.addOpinion = function (opinion) {
                Beers.addOpinion({id: $scope.beer.id }, opinion, function (beer) {
                    $scope.beer = beer;
                    $scope.newOpinion = Beers.newOpinion();
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
