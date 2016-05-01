'use strict';

// Declare app level module which depends on views, and components
angular.module('ITS', [
    'ngRoute',
    'ITS.dashboard',
    'ITS.homeController',
    'ITS.version',
    'ITS.notifyService',
    'ngCookies'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }])

    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')


    .run(['$rootScope' ,'$location','authentication','$cookies','$http',
        function ($rootScope, $location, authentication) {
        $rootScope.$on('$locationChangeStart', function (event) {
             authentication.refreshCookie();
            if (!authentication.isAuthenticated()) {
                // Authorization check: anonymous site visitors cannot access user routes
                $location.path("/home");
            }


        });
    }]);
