'use strict';

angular.module('ITS.homeController', ['ngRoute', 'ITS.user.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeController'
        });
    }])

    .controller('homeController',
    ['$scope', 'authentication', '$location',
        function ($scope, authentication, $location) {

            $scope.login = function (user) {

                authentication.loginUser(user)
                    .then(function (response) {

                        $location.path("/user")
                    })
            };

            $scope.register = function (user) {

                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        $location.path("/user")
                    })
            };

            $scope.logout = function logout() {
                authentication.logout();

            };


        }]);

