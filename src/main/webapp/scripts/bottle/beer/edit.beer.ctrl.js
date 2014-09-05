'use strict';

angular.module('bestBottle.beer')
    .controller('BeerController', ['$scope', '$routeParams', '$location', '$http', '$sce', '$localStorage', 'Beers', 'FLAGS', 'BEER',
        function ($scope, $routeParams, $location, $http, $sce, $localStorage, Beers, FLAGS, BEER) {
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

            $scope.colors = angular.copy(BEER.colors);
            $scope.types = angular.copy(BEER.types);
            $scope.quantities = angular.copy(BEER.quantities);

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
                $scope.beer
                    .$save(function (response) {
                        $location.path('/beer/' + response.id);
                    })
                    .finally(function () {
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


            $scope.findOne = function (id) {
                var beers = $localStorage.beers || [];
                angular.forEach(beers, function (beer) {
                    if (beer.id == id) {
                        $scope.beer = beer;
                    }
                });

                Beers.get({ id: id }, function (beer) {
                    $scope.beer = beer;
                });
            };

            $scope.addOpinion = function (opinion) {
                $scope.saveOnGoing = true;
                Beers.addOpinion({id: $scope.beer.id }, opinion,
                    function (beer) {
                        $scope.beer = beer;
                        $scope.cancelOpinion();
                        $scope.saveOnGoing = false;
                    }, function () {
                        $scope.saveOnGoing = false;
                    });
            };

            $scope.cancelOpinion = function () {
                $scope.newOpinion = Beers.newOpinion();
                $scope.displayOpinion = false;
            };

            $scope.init = function () {
                if (!$routeParams.beerId) {
                    $scope.creation = true;
                    $scope.beer = Beers.new();
                } else {
                    $scope.findOne($routeParams.beerId);
                }
            };
        }]);
