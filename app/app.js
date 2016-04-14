'use strict';

// Declare app level module which depends on views, and components
angular.module('ITS', [
    'ngRoute',
    'ITS.user',
    'ITS.homeController',
    'ITS.version'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }])

    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api/')


.run(function ($rootScope, $location, authentication) {
    $rootScope.$on('$locationChangeStart', function (event) {
        if (!authentication.isLoggedIn()) {
            // Authorization check: anonymous site visitors cannot access user routes
            $location.path("/home");
        }
    });
});
