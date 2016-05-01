'use strict';

angular.module('ITS.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'user/dashboard.html',
            controller: 'dashboardCtrl'
        });
    }])

    .controller('dashboardCtrl', [function() {

    }]);