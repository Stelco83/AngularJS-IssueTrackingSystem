'use strict';

angular.module('ITS.user', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'user/user.html',
            controller: 'userCtrl'
        });
    }])

    .controller('userCtrl', [function() {

    }]);