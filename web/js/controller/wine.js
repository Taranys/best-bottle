'use strict';

controllers.controller('WineController', function ($scope, $location, $routeParams, $filter, $timeout, Auth, api, constant) {
    var tableName = 'wine';

    // define default wine value
    $scope.wine = {
        name: "",
        type: "",
        location: "",
        description: "",
        vineyard: "",
        picture: {},
        rating: 0.0,
        drink: [],
        comments: []
    };

    $scope.winesByTypes = []

    $scope.searchValue = "";

    //define lists
    $scope.types = [];
    $scope.locations = [];
    $scope.containers = [];

    //define view states
    $scope.addCommentViewActivated = false;

    $scope.onLoad = false;

    // save function
    $scope.save = function () {
        //create a new wine
        if (!$scope.wineId) {
            //generate id from name to have a beautiful URL :)
            var id = api.createIdFromString($scope.wine.name);
            api.get('constant', 'images', 'images.empty_image')
                .success(function (result) {
                    $scope.wine.picture = result.fields['images.empty_image'];
                    api.createWithId(tableName, id, $scope.wine)
                        .success(function (wine) {
                            $location.path('/wine/' + wine._id);
                        })
                        .error(function (dataOnError) {
                            $scope.errorMessage = "Impossible to create wine : " + dataOnError;
                        });
                })
                .error(function (dataOnError) {
                    $scope.errorMessage = "Impossible to create wine : " + dataOnError;
                })
        }
        //save current
        else {
            api.update(tableName, $scope.wineId, $scope.wine)
                .success(function () {
                    $scope.successMessage = "Wine correctly saved !";
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

    // load wine from server
    $scope.load = function () {
        if ($scope.wineId) {
            $scope.onLoad = true;
            api.get(tableName, $scope.wineId)
                .success(function (wine) {
                    if (wine.exists == true) {
                        $scope.wine = wine._source;
                    }
                    $scope.wineId = wine._id;

                    //create empty array if not exists
                    if (!$scope.wine.drink) $scope.wine.drink = [];
                    if (!$scope.wine.comments) $scope.wine.comments = [];

                    $scope.addCommentViewActivated = false;

                    $scope.onLoad = false;
                })
                .error(function (error) {
                    $location.path('/wine/');
                    $scope.errorMessage = "Impossible to load current wine : " + error;
                    $scope.onLoad = false;
                });
        }
    };

    $scope.delete = function () {
        if ($scope.wineId && confirm("Are you sure ?")) {
            //set button to loading state
            $('#deleteButton').button('loading');
            //send delete request
            api.delete(tableName, $scope.wineId)
                .success(function () {
                    $location.path('/wine/');
                })
                .error(function (error) {
                    $scope.errorMessage = "Impossible to delete current wine : " + error;
                });
        }
    };

    //Update rating and drink each time wine is modified
    $scope.$watch('wine', function () {
        $scope.refreshValuesOnCurrentWine();
    });

    $scope.refreshValuesOnCurrentWine = function () {
        if ($scope.wine.comments.length == 0) {
            $scope.wine.rating = 0.0;
            $scope.wine.drink = [];
        }

        //Search average prices and rating
        var newRating = 0;
        var drinks = [];
        for (var i = 0; i < $scope.wine.comments.length; i++) {
            var comment = $scope.wine.comments[i];
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

        $scope.wine.rating = newRating / $scope.wine.comments.length;
        $scope.wine.drink = [];
        for (var key in drinks) {
            $scope.wine.drink.push({
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
        $scope.wine.comments.push($scope.newComment);
        $scope.newComment = $scope.createNewComment();
        $scope.refreshValuesOnCurrentWine();
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

    $scope.refreshWineList = function () {
        //get all but only displayed fields : name/type/rating
        api.getAll('wine', ['name', 'type', 'location', 'rating'])
            .success(function (data) {
                var wines = [];
                angular.forEach(data.hits.hits, function (result) {
                    var tmp = {};
                    if (result._source) {
                        tmp = result._source;
                    } else if (result.fields) {
                        tmp = result.fields;
                    }
                    tmp.id = result._id;
                    this.push(tmp);
                }, wines);

                $scope.winesByTypes = {};
                for (var i = 0; i < wines.length; i++) {
                    var wine = wines[i];
                    if (!$scope.winesByTypes[wine.type]) $scope.winesByTypes[wine.type] = { name: wine.type, wines: []};
                    $scope.winesByTypes[wine.type].wines.push(wine);
                }
            })
            .error(function (error) {
                $scope.error = error;
            });
    };

    $scope.initializeView = function () {
        //load countries from DB
        api.getDistinctFieldValues(tableName, 'location')
            .success(function (data) {
                var terms = data.facets.tag.terms;
                angular.forEach(terms, function (term) {
                    $scope.locations.push(term.term);
                });
            });

        //load constants
        constant.get().then(function (data) {
            $scope.containers = data.wine.drink.container;
            $scope.types = data.wine.type;
        });

        //load wine list
        $scope.refreshWineList();

        //if $routeParams.id is defined => wine already exists : load from DB
        if ($routeParams.id) {
            $scope.wineId = $routeParams.id;
            $scope.load();
        }

        $scope.newComment = $scope.createNewComment();

        //configure delete button to have an fancy loading effect :)
        $('#deleteButton').button();
    };

    $scope.initializeView();
});