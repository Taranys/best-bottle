'use strict';

controllers.controller('CreateEditBeerController', function ($scope, $location, $routeParams, $timeout, api, constant) {
    var tableName = 'beer';

    // define default value
    $scope.beer = {
        name: "",
        country: "",
        description: "",
        rating: 0,
        drink: [],
        comment: []
    };

    //define lists
    $scope.countries = []
    $scope.containers = []

    // save function
    $scope.save = function () {
        //create a new beer
        if (!$scope.beerId) {
            //generate id from name to have a beautiful URL :)
            var id = api.createIdFromString($scope.beer.name);
            api.createWithId(tableName, id, $scope.beer)
                .success(function (beer) {
                    $location.path('/beer/' + beer._id);
                })
                .error(function (dataOnError) {
                    $scope.errorMessage = "Impossible to create beer : " + dataOnError;
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
                    $scope.errorMessage = "Impossible to update : " + error;
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

    $scope.delete = function () {
        if ($scope.beerId && confirm("Are you sure ?")) {
            //set button to loading state
            $('#deleteButton').button('loading')
            //send delete request
            api.delete(tableName, $scope.beerId)
                .success(function () {
                    $location.path('/beer/');
                })
                .error(function (error) {
                    $scope.errorMessage = "Impossible to delete current beer : " + error;
                });
        }
    }

    //load countries from DB
    api.getDistinctFieldValues(tableName, 'country')
        .success(function (data) {
            var terms = data.facets.tag.terms;
            angular.forEach(terms, function (term) {
                $scope.countries.push(term.term);
            });
        });

    //load constants
    constant.get().success(function (data) {
        $scope.containers = data._source.beer.drink.container;
    });


    //if $routeParams.id is defined => beer already exists : load from DB
    if ($routeParams.id) {
        $scope.beerId = $routeParams.id;
        $scope.load();
    }
    //configure delete button to have an fancy loading effect :)
    $('#deleteButton').button();
});