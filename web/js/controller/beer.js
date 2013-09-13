'use strict';

controllers.controller('BeerController', function ($scope, $location, $routeParams, $filter, $timeout, Auth, api, constant) {
    var tableName = 'beer';

    // define default beer value
    $scope.beer = {
        name: "",
        country: "",
        description: "",
        picture: "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",
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

    $scope.onLoad = false;

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
    }

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

    $scope.getPicture = function () {
        return "data:image/*;base64," + $scope.beer.picture;
    }

    $scope.handleDragOver = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
    };

    $scope.handleFileSelect = function (evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = [];
        if (evt.dataTransfer) {
            files = evt.dataTransfer.files;
        } else if (evt.target) {
            files = evt.target.files;
        }

        for (var i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }

            var reader = new FileReader();
            //on image load, add image to beer model
            reader.onload = function (e) {
                $scope.$apply(function () {
                    //retreive data
                    var base64 = e.target.result.split(',')[1];

                    //reduce image size to 200 width
                    var image = new Image();
                    image.src = "data:image/*;base64," + base64;
                    $timeout(function () {
                        var canvas = document.getElementById('canvas');
                        var context = canvas.getContext("2d");
                        var factor = 200.0 / image.width;
                        canvas.width = image.width * factor;
                        canvas.height = image.height * factor;
                        context.drawImage(image, image.x, image.y, image.width, image.height, 0, 0, canvas.width, canvas.height);
                        var vData = canvas.toDataURL(0.5).split(',')[1];
                        $scope.beer.picture = vData;
                    }, 100);
                });
            };
            reader.readAsDataURL(f);
            return;
        }
    };

    $scope.activeFileButton = function () {
        document.getElementById('addPictureByClick').click();
    };

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

    // Setup the dnd listeners.
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', $scope.handleDragOver, false);
    dropZone.addEventListener('drop', $scope.handleFileSelect, false);
    dropZone.addEventListener('click', $scope.activeFileButton, false);

    document.getElementById('addPictureByClick').addEventListener('change', $scope.handleFileSelect, false);
});