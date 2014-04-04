'use strict';

angular.module('BestBottle').controller('IndexController', ['$scope', function ($scope) {
    $scope.data = [
        {
            title : 'Boisson',
            links : [
                {
                    link : "#/beers",
                    img : "img/icons/beer.png",
                    label : "Bière"
                },{
                    link : "#/wines",
                    img : "img/icons/wine.png",
                    label : "Vin & Champagne"
                },{
                    link : "#/coctails",
                    img : "img/icons/coctail.png",
                    label : "Cocktail"
                },{
                    link : "#/spirits",
                    img : "img/icons/spirit.png",
                    label : "Spiritueux"
                }
            ]
        },
        {
            title : 'Gastronomie',
            links : [
                {
                    link : "#/apetizers",
                    img : "img/icons/apetizer.png",
                    label : "Apéro"
                },{
                    link : "#/starters",
                    img : "img/icons/starter.png",
                    label : "Entrée"
                },{
                    link : "#/foods",
                    img : "img/icons/food.png",
                    label : "Plat"
                },{
                    link : "#/desserts",
                    img : "img/icons/dessert.png",
                    label : "Dessert"
                }
            ]
        }
    ]
}]);