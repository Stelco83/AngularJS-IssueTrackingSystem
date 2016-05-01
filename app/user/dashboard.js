'use strict';

angular.module('ITS.dashboardController', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'user/dashboard.html',
            controller: 'dashboardCtrl'
        });
    }])

    .controller('dashboardCtrl', [function() {

    }]);