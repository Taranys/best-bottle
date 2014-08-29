'use strict';

/* Constants */

angular.module('bestBottle.cst', [])
    .constant('USER_ROLES', {
        all: '*',
        admin: 'ROLE_ADMIN',
        user: 'ROLE_USER'
    })
// Define for each locale the associated flag
// It will be used by the library "http://www.famfamfam.com/lab/icons/flags/"
// to display the flag
    .constant('FLAGS', {
        en: 'us'
    })
    .constant('BEER', {
        colors: [
            { id: "WHITE", name: "global.beer.color.white" },
            { id: "YELLOW", name: "global.beer.color.yellow" },
            { id: "RED", name: "global.beer.color.red" },
            { id: "AMBER", name: "global.beer.color.amber" },
            { id: "BROWN", name: "global.beer.color.brown" },
            { id: "BLACK", name: "global.beer.color.black" },
            { id: "LAMBIC", name: "global.beer.color.lambic" }
        ],
        types: {
            DRAFT: { name: "global.beer.type.draft", img: 'images/beers/draft.png' },
            BOTTLE: { name: "global.beer.type.bottle", img: 'images/beers/bottle.png' }
        },
        quantities: [
            { quantity: 25, label: '25cl' },
            { quantity: 33, label: '33cl' },
            { quantity: 50, label: '50cl' },
            { quantity: 37, label: '37.5cl' },
            { quantity: 75, label: '37.5cl' },
            { quantity: 100, label: '1 l' },
            { quantity: 150, label: '1,5 l' }
        ]
    });