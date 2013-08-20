'use strict';

controllers.controller('CreateBeerController', function ($scope, $location, Elastic) {
    // define default value
    $scope.beer = {
        name: "",
        description: "",
        score: {
            bottle: 1,
            draft: 1,
            can: 1
        },
        cost: {
            bottle: 1,
            bar: 1
        }
    };

    $scope.save = function () {
        //generate id to have a magnificent URL :)
        var id = Elastic.createIdFromString($scope.beer.name);
        Elastic.createWithId('beer', id, $scope.beer,
            function (dataOnSuccess) {
                $location.path('#/beer/' + dataOnSuccess._id);
            },
            function (dataOnError) {
                $scope.errorMessage = "Impossible to save the beer : " + dataOnError;
            });
    }
});