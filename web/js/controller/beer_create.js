'use strict';

controllers.controller('CreateEditBeerController', function ($scope, $location, $routeParams, $timeout, api, constant) {
    var tableName = 'beer';

    // define default beer value
    $scope.beer = {
        name: "",
        country: "",
        description: "",
        rating: 0,
        drink: [],
        comments: []
    };

    //Define default comment value
    $scope.newComment = {
        username: "",
        date: "",
        rating: 0,
        description: "",
        place: "",
        drink: {
            price: "",
            container: ""
        }
    }

    //define lists
    $scope.countries = []
    $scope.containers = []

    //define view states
    $scope.addCommentViewActivated = false;

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

                    //create empty array if not exists
                    if (!$scope.beer.drink) $scope.beer.drink = [];
                    if (!$scope.beer.comments) $scope.beer.comments = [];

                    $scope.addCommentViewActivated = false;
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

    //Update rating and drink each time beer is modified
    $scope.$watch('beer', function () {
        if ($scope.beer.comments.length == 0) {
            $scope.beer.rating = 0;
            $scope.beer.drink = [];
        }

        //Search average prices and rating
        var newRating = 0;
        var drinks = [];
        for (var i = 0; i < $scope.beer.comments.length; i++) {
            var comment = $scope.beer.comments[i];
            newRating += comment.rating;
            if (comment.drink.price) {
                if (!drinks[comment.drink.container]) drinks[comment.drink.container] = {
                    total: 0,
                    count: 0
                }
                drinks[comment.drink.container].total += comment.drink.price;
                drinks[comment.drink.container].count += 1;
            }
        }

        $scope.beer.rating = newRating / $scope.beer.comments.length;
        $scope.beer.drink = [];
        for (var key in drinks) {
            $scope.beer.drink.push({
                price: drinks[key].total / drinks[key].count,
                container: key
            });
        }
    });

    $scope.activateAddComment = function () {
        $scope.addCommentViewActivated = true;
    }

    $scope.addComment = function () {
        $scope.beer.comments.push($scope.newComment);
        $scope.save();
        $scope.load();
    }

    $scope.getPanelColor = function (rating) {
        if (rating == 0) return { "panel-danger": true };
        if (rating == 1) return { "panel-warning": true };
        if (rating == 2) return { "panel-default": true };
        if (rating == 3) return { "panel-info": true };
        if (rating == 4) return { "panel-primary": true };
        if (rating == 5) return { "panel-success": true };
    }

    $scope.getMapUrl = function (str) {
        if (str) {
            var pattern = 'https://www.google.fr/maps?q=';
            return pattern + encodeURIComponent(str);
        }
        return "";
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