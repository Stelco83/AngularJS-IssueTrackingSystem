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

        $routeProvider.when('/projects/:id/addIssue', {
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

        function ($scope, authentication, $location, notifyService, issueService, pageSize, $routeParams ) {

            $scope.issueParams = {
                'startPage': 1,
                'pageSize': pageSize

            };


            $scope.hideIssues = function () {
                $('.info').hide();
                $('#hiddenButton').hide();
            };



            $scope.getUserIssues = function () {
                issueService.getUsersIssues($scope.issueParams,
                    function success(data) {
                        $scope.userIssues = data.Issues;
                        $scope.allIssues = data.TotalPages * $scope.issueParams.pageSize;
                        $('#hiddenButton').show();
                    },
                    function error(err) {
                        notifyService.showError("Issues loading failed", err);
                    }
                );
            };


            $scope.addComment = function (issueId, comment) {
                issueService.addCommentToIssue(issueId, comment,
                    function success(data) {

                        notifyService.showInfo("Comment added successfully");
                        $scope.$broadcast("totalCommentsChanged", data);
                    },
                    function error(err) {
                        notifyService.showError("Comment posting failed", err);
                    }
                );
            };

            $scope.$on("totalCommentsChanged", function (event, allComments) {
                $scope.issueComments = allComments;
                document.getElementById("issueComment").value = "";

                $scope.getIssueComments();
            });

            $scope.getUserIssues();

            issueService.getIssueById($routeParams.id,
                function success(data) {
                    $scope.issueData = data;

                },
                function error(err) {
                    notifyService.showError("Issue loading failed", err);
                }
            );

            $scope.changeStatus = function (issueId, statusId, statusName) {
                issueService.changeIssueStatus(issueId, statusId,
                    function success(data) {
                        $scope.issueData.AvailableStatuses = data;
                        $scope.$broadcast("statusSelectionChanged", statusName);
                    },
                    function error(err) {
                        notifyService.showError("Status change failed", err);
                    }
                );
            };


            $scope.getIssueComments = function () {
                issueService.getCommentsById($routeParams.id,
                    function success(data) {
                        $scope.issueComments = data;
                    },
                    function error(err) {
                        notifyService.showError("Issue Comments loading failed", err);
                    }
                );
            };

            $scope.getIssueComments();


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



                $scope.$on("statusSelectionChanged", function (event, selectedStatus) {
                    $scope.issueData.Status.Name = selectedStatus;

                    $scope.getUserIssues();
                });





            }
        }]);

