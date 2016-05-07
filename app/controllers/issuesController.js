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

        $routeProvider.when('/projects/addIssue', {
            templateUrl: 'templates/addIssue.html',
            controller: 'projectController'
        });

        $routeProvider.when('/issue/:id/edit', {
            templateUrl: 'templates/editIssue.html',
            controller: 'issuesController'
        });
    }])

    .controller('issuesController',
    ['$scope', 'authentication',
        '$location', 'notifyService', 'issueService', 'pageSize', '$routeParams',

        function ($scope, authentication, $location, notifyService, issueService, pageSize, $routeParams) {

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

            //need for adding new issue + hardcoded users too much users in database!?
            issueService.getAllUsers(
                function success(data) {
                    $scope.allUsers = [
                        {"Id": "00040d32-9769-4c9a-909f-5d0773e77ee5", "Username": "gosho.vitkov1@gmail.com", "isAdmin": true}
                    ];
                },
                function error(err) {
                    notifyService.showError("Users loading failed", err);
                }
            );

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


            $scope.editIssue = function (editIssueData) {
                var labelsList = [];

                var stringLabels = editIssueData.Labels.split(', ');
                stringLabels.forEach(function (element) {
                    labelsList.push({Name: element.trim()})
                });

                editIssueData.Labels = labelsList;
                editIssueData.Id = $scope.issueData.Id;

                issueService.editIssue(editIssueData,
                    function success() {
                        notifyService.showInfo("Issue edited successfully");
                        $location.path("/dashboard");
                    },
                    function error(err) {
                        notifyService.showError("Issue edit failed", err);
                    }
                );


                $scope.hideIssues = function () {
                    $(".info").hide();
                }

            }
        }]);

