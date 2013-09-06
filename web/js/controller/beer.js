'use strict';

controllers.controller('BeerController', function ($scope, $location, $routeParams, $filter, $timeout, api, constant) {
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

    $scope.beersByCountries = []

    $scope.searchValue = "";

    //define lists
    $scope.countries = [];
    $scope.containers = [];

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
                    $scope.load();
                })
                .error(function (error) {
                    $scope.errorMessage = "Impossible to update : " + error;
                })
        }
    };

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
    };

    $scope.delete = function () {
        if ($scope.beerId && confirm("Are you sure ?")) {
            //set button to loading state
            $('#deleteButton').button('loading');
            //send delete request
            api.delete(tableName, $scope.beerId)
                .success(function () {
                    $location.path('/beer/');
                })
                .error(function (error) {
                    $scope.errorMessage = "Impossible to delete current beer : " + error;
                });
        }
    };

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
                if (!drinks[comment.drink.container]) {
                    drinks[comment.drink.container] = {
                        total: 0,
                        count: 0
                    };
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

    $scope.activateAddComment = function (activate) {
        if (angular.isUndefined(activate)) {
            activate = true;
        }
        $scope.addCommentViewActivated = activate;
    };

    //Define default comment value
    $scope.createNewComment = function () {
        return {
            username: "",
            date: "",
            rating: 0,
            description: "",
            place: "",
            drink: {
                price: "",
                container: ""
            }
        };
    };

    $scope.addComment = function () {
        $scope.newComment.date = Date.now();
        $scope.beer.comments.push($scope.newComment);
        $scope.newComment = $scope.createNewComment();
        $scope.save();
    };

    $scope.getLabelColor = function (rating) {
        var style = {};
        style["label-" + $scope.getRatingColor(rating)] = true;
        return style;
    };

    $scope.getPanelColor = function (rating) {
        var style = {};
        style["panel-" + $scope.getRatingColor(rating)] = true;
        return style;
    };

    $scope.getRatingColor = function (rating) {
        if (rating == 1) return "danger";
        if (rating == 2) return "warning";
        if (rating == 3) return "info";
        if (rating == 4) return "primary";
        if (rating == 5) return "success";
        return "default";
    };


    $scope.getMapUrl = function (str) {
        if (str) {
            var pattern = 'https://www.google.fr/maps?q=';
            return pattern + encodeURIComponent(str);
        }
        return "";
    };

    $scope.getDate = function (milliseconds) {
        return new Date(milliseconds).toLocaleDateString();
    };

    $scope.isEmpty = function (values) {
        return angular.isArray(values) && values.length == 0;
    };

    $scope.refreshBeerList = function () {
        api.getAll('beer')
            .success(function (data) {
                var beers = [];
                angular.forEach(data.hits.hits, function (result) {
                    var tmp = result._source;
                    tmp.id = result._id;
                    this.push(tmp);
                }, beers);

                $scope.beersByCountries = {};
                for (var i = 0; i < beers.length; i++) {
                    var beer = beers[i];
                    if (!$scope.beersByCountries[beer.country]) $scope.beersByCountries[beer.country] = { name: beer.country, beers: []};
                    $scope.beersByCountries[beer.country].beers.push(beer);
                }
            })
            .error(function (error) {
                $scope.error = error;
            });
    };

    $scope.checkBeersNumber = function (beersByCountry) {
        return $filter('filter')(beersByCountry.beers, $scope.searchValue).length;
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

    //load beer list
    $scope.refreshBeerList();

    //if $routeParams.id is defined => beer already exists : load from DB
    if ($routeParams.id) {
        $scope.beerId = $routeParams.id;
        $scope.load();
    }

    $scope.newComment = $scope.createNewComment();

    //configure delete button to have an fancy loading effect :)
    $('#deleteButton').button();
});