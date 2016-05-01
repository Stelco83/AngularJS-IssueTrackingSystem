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
                    .then(function () {
                        $location.path("/dashboard")
                    })
            };

            $scope.register = function (user) {

                authentication.registerUser(user)
                    .then(function () {
                        authentication.loginUser(user)
                            .then(function () {
                                $location.path("/dashboard")
                            })

                    })
            };


            $scope.logout = function() {
                authentication.logout();
                $location.path("/")
            };


            $scope.getUsers = function () {
                authentication.getAllUsers()
                    .then(function (response) {

                    })
            }

        }]);

