'use strict';

angular.module('bestBottleApp')
    .controller('MainController', [ '$scope',
        function ($scope) {
            $scope.data = [
                {
                    title: 'Boissons',
                    links: [
                        {
                            link: '#/beers',
                            img: 'images/icons/beer.png',
                            label: 'Bière'
                        },
                        {
                            link: '#/wines',
                            img: 'images/icons/wine.png',
                            label: 'Vin & Champagne'
                        },
                        {
                            link: '#/coctails',
                            img: 'images/icons/coctail.png',
                            label: 'Cocktail'
                        },
                        {
                            link: '#/spirits',
                            img: 'images/icons/spirit.png',
                            label: 'Spiritueux'
                        }
                    ]
                },
                {
                    title: 'Gastronomie',
                    links: [
                        {
                            link: '#/apetizers',
                            img: 'images/icons/apetizer.png',
                            label: 'Apéro'
                        },
                        {
                            link: '#/starters',
                            img: 'images/icons/starter.png',
                            label: 'Entrée'
                        },
                        {
                            link: '#/foods',
                            img: 'images/icons/food.png',
                            label: 'Plat'
                        },
                        {
                            link: '#/desserts',
                            img: 'images/icons/dessert.png',
                            label: 'Dessert'
                        }
                    ]
                }
            ];
        }]);
