'use strict';

angular.module('bestBottle.beer')
    .controller('BeerController', ['$scope', '$routeParams', '$location', 'Beers', '$http',
        function ($scope, $routeParams, $location, Beers, $http) {
            $http.get('i18n/countries/fr.json')
                .success(function (countries) {
                    $scope.countries = countries;
                })
                .error(function (error) {
                    console.error(error);
                });

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
                    $location.path('beers/' + beer.id);
                });
            };

            $scope.findOne = function () {
                Beers.get({ id: $routeParams.beerId }, function (beer) {
                    $scope.beer = beer;
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