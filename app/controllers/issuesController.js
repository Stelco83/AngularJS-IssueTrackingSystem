'use strict';

angular.module('ITS.issuesController',
    ['ngRoute', 'ITS.user.authentication', 'ITS.homeController']
)

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'user/dashboard.html',
            controller: 'issuesController'
        });
    }])

    .controller('issuesController',
    ['$scope', 'authentication',
        '$location', 'notifyService', 'issueService','pageSize',

        function ($scope, authentication, $location,notifyService ,issueService,pageSize) {

            $scope.projectParams = {
                'startPage': 1,
                'pageSize': pageSize
            };

            $scope.getUserIssues = function () {
                issueService.getUsersIssues($scope.projectParams,
                    function success(data) {
                        $scope.userIssues = data.Issues;
                        $scope.allIssues = data.TotalPages * $scope.projectParams.pageSize;

                    },
                    function error(err) {
                        notifyService.showError("Issues loading failed", err);
                    }
                );
            };
        
            $scope.getUsers = function () {
                authentication.getAllUsers()
                    .then(function () {

                    })
            }

        }]);

