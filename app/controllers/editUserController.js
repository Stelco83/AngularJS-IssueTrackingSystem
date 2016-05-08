'use strict';

angular.module('ITS.editUserController', ['ngRoute', 'ITS.user.authentication'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/editUser', {
            templateUrl: 'user/editUser.html',
            controller: 'editUserController'
        });
    }])

    .controller('editUserController', ['$scope', 'authentication' ,
        'projectService','issueService' ,'notifyService',
        function ($scope, authentication, projectService, issueService,notifyService) {


            $scope.newPassword = function (userPassword) {
                authentication.changePassword(userPassword)
                    .then(function () {

                    })
            };


            $scope.makeAdmin = function (e) {

               var id = $scope.getIdForAdmin = e.target.attributes['user-id'].value;

                var userData = { userId: id  };

                projectService.makeAdmin(
                    userData,
                    function success() {

                        notifyService.showInfo("Admin has created!");
                    },
                    function error(err) {
                        notifyService.showError("Failed making Admin!", err);
                    });
            };


            $scope.showAllUsers = function() {
                issueService.getAllUsers(
                    function success(data) {
                        $scope.usersAll = data;
                    },
                    function error(err) {
                        notifyService.showError("Failed loading data...", err);

                    });
            };


        }]);