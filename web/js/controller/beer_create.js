'use strict';

controllers.controller('CreateEditBeerController', function ($scope, $location, $routeParams, $timeout, api) {
    var tableName = 'beer';

    // define default value
    $scope.beer = {
        name: "",
        score: {
            bottle: 0,
            draft: 0,
            can: 0
        },
        cost: {
            bottle: 0.0,
            bar: 0.0
        },
        description: ""
    };

    // save function
    $scope.save = function () {
        //create a new beer
        if (!$scope.beerId) {

            //generate id to have a beautiful URL :)
            var id = api.createIdFromString($scope.beer.name);
            api.createWithId(tableName, id, $scope.beer)
                .success(function (beer) {
                    $location.path('/beer/' + beer._id);
                })
                .error(function (dataOnError) {
                    $scope.errorMessage = "Impossible to save the beer : " + dataOnError;
                });
        }
        //save current
        else {
            api.update(tableName, $scope.beerId, $scope.beer)
                .success(function () {
                    $scope.successMessage = "Beer correctly saved !";
                    //remove message after 2s
                    $timeout(function () {
                        delete $scope.successMessage;
                    }, 2000);
                })
                .error(function (error) {
                    $scope.errorMessage = "Impossible to load current beer : " + error;
                })
        }
    }

    // load beer from server
    $scope.load = function () {
        if ($scope.beerId) {
            api.get(tableName, $scope.beerId)
                .success(function (beer) {
                    if (beer.exists == true) {
                        $scope.beer = beer._source;
                    }
                    $scope.beerId = beer._id;
                })
                .error(function (error) {
                    $scope.errorMessage = "Impossible to load current beer : " + error;
                });
        }
    }

    //if $routeParams.id is defined => beer already exists : load from DB
    if ($routeParams.id) {
        $scope.beerId = $routeParams.id;
        $scope.load();
    }
});