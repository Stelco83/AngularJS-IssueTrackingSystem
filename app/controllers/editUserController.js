'use strict';

angular.module('ITS.editUserController', ['ngRoute', 'ITS.user.authentication'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/editUser', {
            templateUrl: 'user/editUser.html',
            controller: 'editUserController'
        });
    }])

    .controller('editUserController', ['$scope', 'authentication' ,
        function($scope, authentication) {
        $scope.newPassword = function (userPassword) {
            authentication.changePassword(userPassword)
                .then(function () {

                })

        };
    }]);