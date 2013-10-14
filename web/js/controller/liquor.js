'use strict';

controllers.controller('LiquorController', function ($scope, $location, $routeParams, $filter, $timeout, Auth, api, constant) {
    var tableName = 'liquor';

    // define default liquor value
    $scope.liquor = {
        name: "",
        type: "",
        description: "",
        picture: {},
        rating: 0.0,
        drink: [],
        comments: []
    };

    $scope.liquorsByTypes = []

    $scope.searchValue = "";

    //define lists
    $scope.types = [];
    $scope.containers = [];

    //define view states
    $scope.addCommentViewActivated = false;

    $scope.onLoad = false;

    // save function
    $scope.save = function () {
        if (!$scope.id) {
            //generate id from name to have a beautiful URL :)
            var id = api.createIdFromString($scope.liquor.name);
            api.get('constant', 'images', 'images.empty_image')
                .success(function (result) {
                    $scope.liquor.picture = result.fields['images.empty_image'];
                    api.createWithId(tableName, id, $scope.liquor)
                        .success(function (liquor) {
                            $location.path('/liquor/' + liquor._id);
                        })
                        .error(function (dataOnError) {
                            $scope.errorMessage = "Impossible to create liquor : " + dataOnError;
                        });
                })
                .error(function (dataOnError) {
                    $scope.errorMessage = "Impossible to create liquor : " + dataOnError;
                })
        }
        //save current
        else {
            api.update(tableName, $scope.id, $scope.liquor)
                .success(function () {
                    $scope.successMessage = "Liquor correctly saved !";
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

    // load liquor from server
    $scope.load = function () {
        if ($scope.id) {
            $scope.onLoad = true;
            api.get(tableName, $scope.id)
                .success(function (liquor) {
                    if (liquor.exists == true) {
                        $scope.liquor = liquor._source;
                    }
                    $scope.id = liquor._id;

                    //create empty array if not exists
                    if (!$scope.liquor.drink) $scope.liquor.drink = [];
                    if (!$scope.liquor.comments) $scope.liquor.comments = [];

                    $scope.addCommentViewActivated = false;

                    $scope.onLoad = false;
                })
                .error(function (error) {
                    $location.path('/liquor/');
                    $scope.errorMessage = "Impossible to load current liquor : " + error;
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
                    $location.path('/liquor/');
                })
                .error(function (error) {
                    $scope.errorMessage = "Impossible to delete current liquor : " + error;
                });
        }
    };

    //Update rating and drink each time liquor is modified
    $scope.$watch('liquor', function () {
        $scope.refreshValuesOnCurrentLiquor();
    });

    $scope.refreshValuesOnCurrentLiquor = function () {
        if ($scope.liquor.comments.length == 0) {
            $scope.liquor.rating = 0.0;
            $scope.liquor.drink = [];
        }

        //Search average prices and rating
        var newRating = 0;
        var drinks = [];
        for (var i = 0; i < $scope.liquor.comments.length; i++) {
            var comment = $scope.liquor.comments[i];
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

        $scope.liquor.rating = newRating / $scope.liquor.comments.length;
        $scope.liquor.drink = [];
        for (var key in drinks) {
            $scope.liquor.drink.push({
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
        $scope.liquor.comments.push($scope.newComment);
        $scope.newComment = $scope.createNewComment();
        $scope.refreshValuesOnCurrentLiquor();
        $scope.save();
    };

    $scope.refreshLiquorList = function () {
        //get all but only displayed fields : name/types/rating
        api.getAll('liquor', ['name', 'type', 'rating'])
            .success(function (data) {
                var liquors = [];
                angular.forEach(data.hits.hits, function (result) {
                    var tmp = {};
                    if (result._source) {
                        tmp = result._source;
                    } else if (result.fields) {
                        tmp = result.fields;
                    }
                    tmp.id = result._id;
                    this.push(tmp);
                }, liquors);

                $scope.liquorsByTypes = {};
                for (var i = 0; i < liquors.length; i++) {
                    var liquor = liquors[i];
                    if (!$scope.liquorsByTypes[liquor.type]) $scope.liquorsByTypes[liquor.type] = { name: liquor.type, liquors: []};
                    $scope.liquorsByTypes[liquor.type].liquors.push(liquor);
                }
            })
            .error(function (error) {
                $scope.error = error;
            });
    };

    $scope.initializeView = function () {
        //load constants
        constant.get().then(function (data) {
            $scope.containers = data.liquor.drink.container;
            $scope.types = data.liquor.type;
        });

        //load liquor list
        $scope.refreshLiquorList();

        //if $routeParams.id is defined => liquor already exists : load from DB
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