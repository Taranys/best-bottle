'use strict';

angular.module('bestBottleApp')
    .controller('MainController', [ '$scope',
        function ($scope) {
            $scope.data = [
                {
                    title: 'main.bottle.title',
                    links: [
                        {
                            link: '#/beers',
                            img: 'images/icons/beer.png',
                            label: 'main.bottle.beers'
                        },
                        {
                            link: '#/wines',
                            img: 'images/icons/wine.png',
                            label: 'main.bottle.wines'
                        },
                        {
                            link: '#/cocktails',
                            img: 'images/icons/cocktails.png',
                            label: 'main.bottle.cocktails'
                        },
                        {
                            link: '#/spirits',
                            img: 'images/icons/spirit.png',
                            label: 'main.bottle.spirits'
                        }
                    ]
                },
                {
                    title: 'main.food.title',
                    links: [
                        {
                            link: '#/appetizers',
                            img: 'images/icons/appetizers.png',
                            label: 'main.food.appetizers'
                        },
                        {
                            link: '#/starters',
                            img: 'images/icons/starter.png',
                            label: 'main.food.starters'
                        },
                        {
                            link: '#/foods',
                            img: 'images/icons/food.png',
                            label: 'main.food.foods'
                        },
                        {
                            link: '#/desserts',
                            img: 'images/icons/dessert.png',
                            label: 'main.food.desserts'
                        }
                    ]
                }
            ];
        }]);
