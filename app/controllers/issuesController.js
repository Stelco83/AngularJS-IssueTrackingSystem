'use strict';

angular.module('ITS.issuesController',
    ['ngRoute', 'ITS.user.authentication', 'ITS.homeController']
)

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'templates/dashboard.html',
            controller: 'issuesController'
        });

        $routeProvider.when('/issues/:id', {
            templateUrl: 'templates/issuePage.html',
            controller: 'issuesController'
        });
    }])

    .controller('issuesController',
    ['$scope', 'authentication',
        '$location', 'notifyService', 'issueService', 'pageSize','$routeParams',

        function ($scope, authentication, $location, notifyService,
        issueService, pageSize, $routeParams) {

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

            issueService.getIssueById($routeParams.id,
                function success(data) {
                    $scope.issueData = data;

                },
                function error(err) {
                    notifyService.showError("Issue loading failed", err);
                }
            );



            issueService.getCommentsById($routeParams.id,
                function success(data) {
                    $scope.issueDataComment = data;
                    $scope.allComments = data.length;


                },
                function error(err) {
                    notifyService.showError("Comments loading failed", err);
                }
            );


            $scope.getUsers = function () {
                authentication.getAllUsers()
                    .then(function () {

                    })
            };

            $scope.hideIssues = function () {
                $(".info").hide();
            }

        }]);

