'use strict';

controllers.controller('BeerController', function ($scope, $location, $routeParams, $filter, $timeout, Auth, api, constant) {
    var tableName = 'beer';

    // define default beer value
    $scope.beer = {
        name: "",
        country: "",
        description: "",
        picture: {},
        rating: 0.0,
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

    $scope.onLoad = false;

    // save function
    $scope.save = function () {
        //create a new beer
        if (!$scope.beerId) {
            //generate id from name to have a beautiful URL :)
            var id = api.createIdFromString($scope.beer.name);
            api.get('constant', 'images', 'images.empty_image')
                .success(function (result) {
                    $scope.beer.picture = result.fields['images.empty_image'];
                    api.createWithId(tableName, id, $scope.beer)
                        .success(function (beer) {
                            $location.path('/beer/' + beer._id);
                        })
                        .error(function (dataOnError) {
                            $scope.errorMessage = "Impossible to create beer : " + dataOnError;
                        });
                })
                .error(function (dataOnError) {
                    $scope.errorMessage = "Impossible to create beer : " + dataOnError;
                })
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
            $scope.onLoad = true;
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

                    $scope.onLoad = false;
                })
                .error(function (error) {
                    $location.path('/beer/');
                    $scope.errorMessage = "Impossible to load current beer : " + error;
                    $scope.onLoad = false;
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
        $scope.refreshValuesOnCurrentBeer();
    });

    $scope.refreshValuesOnCurrentBeer = function () {
        if ($scope.beer.comments.length == 0) {
            $scope.beer.rating = 0.0;
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
    };

    $scope.isLogged = function () {
        return Auth.isAuthenticated();
    };

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
        $scope.newComment.username = Auth.username();
        $scope.beer.comments.push($scope.newComment);
        $scope.newComment = $scope.createNewComment();
        $scope.refreshValuesOnCurrentBeer();
        $scope.save();
    };

    $scope.refreshBeerList = function () {
        //get all but only displayed fields : name/country/rating
        api.getAll('beer', ['name', 'country', 'rating'])
            .success(function (data) {
                var beers = [];
                angular.forEach(data.hits.hits, function (result) {
                    var tmp = {};
                    if (result._source) {
                        tmp = result._source;
                    } else if (result.fields) {
                        tmp = result.fields;
                    }
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

    $scope.initializeView = function () {
        //load countries from DB
        api.getDistinctFieldValues(tableName, 'country')
            .success(function (data) {
                var terms = data.facets.tag.terms;
                angular.forEach(terms, function (term) {
                    $scope.countries.push(term.term);
                });
            });

        //load constants
        constant.get().then(function(data) {
            $scope.containers = data.beer.drink.container;
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

//        // Setup the dnd listeners.
//        var dropZone = document.getElementById('drop_zone');
//        dropZone.addEventListener('dragover', $scope.handleDragOver, false);
//        dropZone.addEventListener('drop', $scope.handleFileSelect, false);
//        dropZone.addEventListener('click', $scope.activeFileButton, false);
//
//        document.getElementById('addPictureByClick').addEventListener('change', $scope.handleFileSelect, false);
    };

    $scope.initializeView();
});