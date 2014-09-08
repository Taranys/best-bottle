'use strict';

//Articles service used for articles REST endpoint
angular.module('bestBottle.beer')
    .service('BeerService', ['$rootScope', '$localStorage', '$q', 'Beers', function ($rootScope, $localStorage, $q, Beers) {
        var self = this;

        $localStorage.beers = $localStorage.beers || [];
        $localStorage.localBeers = $localStorage.localBeers || [];
        $localStorage.localBeerOpinion = $localStorage.localBeerOpinion || [];

        self.new = Beers.new;
        self.newOpinion = Beers.newOpinion;
        self.addOpinion = function (id, opinion) {
            var defer = $q.defer();
            if ($rootScope.isOffline()) {
                $localStorage.localBeerOpinion.push({ id: id, opinion: opinion});
            } else {
                Beers.addOpinion({id: id}, opinion, defer.resolve, defer.reject);
            }
            return defer.promise;
        };

        self.hasLocalBeer = function () {
            return $localStorage.localBeers.length !== 0 || $localStorage.localBeerOpinion !== 0;
        };

        self.save = function (beer) {
            var defer = $q.defer();
            if ($rootScope.isOffline()) {
                beer.id = new Date().getTime();
                beer.local = true;
                $localStorage.localBeers.push(beer);

                defer.resolve(beer);
            } else {
                beer.$save().then(defer.resolve);
            }
            return defer.promise;
        };

        self.get = function (id) {
            var defer = $q.defer();
            // get all beer
            if (!id) {
                Beers.query().$promise
                    .then(function (beers) {
                    $localStorage.beers = beers;
                    defer.resolve($localStorage.localBeers.concat(beers));
                })
                    .catch(function () {
                        defer.resolve($localStorage.localBeers);
                    });
            }
            // get all beer
            else {
                Beers.get({ id: id }).$promise
                    .then(function (beer) {
                        defer.resolve(beer);
                    })
                    .catch(function (error) {
                        var beerId = parseInt(id);
                        for (var i = 0; i < $localStorage.localBeers.length; i++) {
                            if ($localStorage.localBeers[i].id === beerId) {
                                defer.resolve($localStorage.localBeers[i]);
                            }
                        }
                        defer.reject(error);
                    });
            }
            return defer.promise;
        };

        self.saveOfflineBeers = function () {
            var beers = angular.copy($localStorage.localBeers);

            angular.forEach(beers, function (beer) {
                var id = beer.id;

                delete beer.id;
                delete beer.local;

                new Beers(beer).$save(function (newBeer) {
                    angular.forEach($localStorage.localBeerOpinion, function (val) {
                        val.id = newBeer.id;
                    });

                    for (var i = 0; i < $localStorage.localBeers.length; i++) {
                        if ($localStorage.localBeers[i].id === id) {
                            $localStorage.localBeers.splice(i, 1);
                            return;
                        }
                    }
                });
            });
        };
    }]);