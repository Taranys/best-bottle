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
        fr: 'fr',
        en: 'us'
    });