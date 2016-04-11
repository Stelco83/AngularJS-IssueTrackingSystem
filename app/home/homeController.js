'use strict';

angular.module('ITS.homeController', ['ngRoute', 'ITS.user.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeController'
        });
    }])

    .controller('homeController',
    ['$scope', 'authentication',
        function ($scope, authentication) {

            $scope.login = function (user) {

                authentication.loginUser(user)
                    .then(function (loggedUser) {
                        console.log(loggedUser);
                    })

            };
            $scope.genders = ["Male", "Female", "Other"];

            $scope.register = function (user) {

                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        console.log(registeredUser);
                    })
            };

            $scope.logout = function logout() {
                authentication.logout();

            };


        }]);