'use strict';

angular.module('ITS.homeController',
    ['ngRoute', 'ITS.user.authentication',
        'ITS.user.issueService','ITS.user.projectService']
)

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'home/home.html',
            controller: 'homeController'
        });
    }])

    .controller('homeController',
    ['$scope', 'authentication', '$location',

        function ($scope, authentication, $location) {
            if (authentication.isAuthenticated()) {
                //  $location.path('/dashboard')

            }

            $scope.authentication = authentication;


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



            $scope.logout = function () {
                authentication.logout();
                $location.path("/")
            };


        }]);

