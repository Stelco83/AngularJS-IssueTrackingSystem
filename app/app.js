'use strict';

// Declare app level module which depends on views, and components
angular.module('ITS', [
    'ngRoute',
    'ngResource',
    'ITS.dashboardController',
    'ITS.homeController',
    'ITS.issuesController',
    'ITS.version',
    'ITS.notifyService',
    'ngCookies',
    'ui.bootstrap.pagination'

]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
    }])

    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('pageSize', 9)

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
