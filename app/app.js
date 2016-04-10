'use strict';

// Declare app level module which depends on views, and components
angular.module('ITS', [
    'ngRoute',
    'ITS.user',
    'ITS.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: "/"});
    }]);
