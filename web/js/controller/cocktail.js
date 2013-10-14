'use strict';

controllers.controller('CocktailController', function ($scope, $location, $routeParams, $filter, $timeout, Auth, api, constant) {
    var tableName = 'cocktail';

    // define default cocktail value
    $scope.cocktail = {
        name: "",
        description: "",
        picture: {},
        rating: 0.0,
        drink: [],
        comments: []
    };

    $scope.cocktails = []

    $scope.searchValue = "";

    //define lists
    $scope.containers = [];

    //define view states
    $scope.addCommentViewActivated = false;

    $scope.onLoad = false;

    // save function
    $scope.save = function () {
        //create a new cocktail
        if (!$scope.id) {
            //generate id from name to have a beautiful URL :)
            var id = api.createIdFromString($scope.cocktail.name);
            api.get('constant', 'images', 'images.empty_image')
                .success(function (result) {
                    $scope.cocktail.picture = result.fields['images.empty_image'];
                    api.createWithId(tableName, id, $scope.cocktail)
                        .success(function (cocktail) {
                            $location.path('/cocktail/' + cocktail._id);
                        })
                        .error(function (dataOnError) {
                            $scope.errorMessage = "Impossible to create cocktail : " + dataOnError;
                        });
                })
                .error(function (dataOnError) {
                    $scope.errorMessage = "Impossible to create cocktail : " + dataOnError;
                })
        }
        //save current
        else {
            api.update(tableName, $scope.id, $scope.cocktail)
                .success(function () {
                    $scope.successMessage = "Cocktail correctly saved !";
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

    // load cocktail from server
    $scope.load = function () {
        if ($scope.id) {
            $scope.onLoad = true;
            api.get(tableName, $scope.id)
                .success(function (cocktail) {
                    if (cocktail.exists == true) {
                        $scope.cocktail = cocktail._source;
                    }
                    $scope.id = cocktail._id;

                    //create empty array if not exists
                    if (!$scope.cocktail.drink) $scope.cocktail.drink = [];
                    if (!$scope.cocktail.comments) $scope.cocktail.comments = [];

                    $scope.addCommentViewActivated = false;

                    $scope.onLoad = false;
                })
                .error(function (error) {
                    $location.path('/cocktail/');
                    $scope.errorMessage = "Impossible to load current cocktail : " + error;
                    $scope.onLoad = false;
                });
        }
    };

    $scope.delete = function () {
        if ($scope.id && confirm("Are you sure ?")) {
            //set button to loading state
            $('#deleteButton').button('loading');
            //send delete request
            api.delete(tableName, $scope.id)
                .success(function () {
                    $location.path('/cocktail/');
                })
                .error(function (error) {
                    $scope.errorMessage = "Impossible to delete current cocktail : " + error;
                });
        }
    };

    //Update rating and drink each time cocktail is modified
    $scope.$watch('cocktail', function () {
        $scope.refreshValuesOnCurrentCocktail();
    });

    $scope.refreshValuesOnCurrentCocktail = function () {
        if ($scope.cocktail.comments.length == 0) {
            $scope.cocktail.rating = 0.0;
            $scope.cocktail.drink = [];
        }

        //Search average prices and rating
        var newRating = 0;
        var drinks = [];
        for (var i = 0; i < $scope.cocktail.comments.length; i++) {
            var comment = $scope.cocktail.comments[i];
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

        $scope.cocktail.rating = newRating / $scope.cocktail.comments.length;
        $scope.cocktail.drink = [];
        for (var key in drinks) {
            $scope.cocktail.drink.push({
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
        $scope.cocktail.comments.push($scope.newComment);
        $scope.newComment = $scope.createNewComment();
        $scope.refreshValuesOnCurrentCocktail();
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
        if (rating < 0) return "default";
        if (rating <= 1) return "danger";
        if (rating <= 2) return "warning";
        if (rating <= 3) return "info";
        if (rating <= 4) return "primary";
        if (rating <= 5) return "success";
        return "default";
    };

    $scope.getDate = function (milliseconds) {
        return new Date(milliseconds).toLocaleDateString();
    };

    $scope.isEmpty = function (values) {
        return angular.isArray(values) && values.length == 0;
    };

    $scope.refreshList = function () {
        //get all but only displayed fields : name/rating
        api.getAll('cocktail', ['name', 'rating'])
            .success(function (data) {
                var cocktails = [];
                angular.forEach(data.hits.hits, function (result) {
                    var tmp = {};
                    if (result._source) {
                        tmp = result._source;
                    } else if (result.fields) {
                        tmp = result.fields;
                    }
                    tmp.id = result._id;
                    this.push(tmp);
                }, cocktails);

                for (var i = 0; i < cocktails.length; i++) {
                    var cocktail = cocktails[i];
                    $scope.cocktails.push(cocktail);
                }
            })
            .error(function (error) {
                $scope.error = error;
            });
    };

    $scope.initializeView = function () {
        //load constants
        constant.get().then(function (data) {
            $scope.containers = data.cocktail.drink.container;
        });

        //load cocktail list
        $scope.refreshList();

        //if $routeParams.id is defined => cocktail already exists : load from DB
        if ($routeParams.id) {
            $scope.id = $routeParams.id;
            $scope.load();
        }

        $scope.newComment = $scope.createNewComment();

        //configure delete button to have an fancy loading effect :)
        $('#deleteButton').button();
    };

    $scope.initializeView();
});