'use strict';

// Declare app level module which depends on views, and components
angular.module('ITS', [
    'ngRoute',
    'ITS.user',
    'ITS.homeController',
    'ITS.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])

    .constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/');
