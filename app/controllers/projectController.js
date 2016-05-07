'use strict';

angular.module('ITS.projectController',
    ['ngRoute', 'ITS.user.authentication', 'ITS.homeController']
)

    .config(['$routeProvider', function ($routeProvider) {
//        $routeProvider.when('/projects/addIssue', {
//            templateUrl: 'templates/addIssue.html',
//            controller: 'issuesController'
//        });
    }])

    .controller('projectController',
    ['$scope', 'authentication',
        '$location', 'notifyService', 'issueService', 'pageSize', '$routeParams',
        'projectService',
        function ($scope, authentication, $location, notifyService, issueService,
                  pageSize, $routeParams, projectService) {

            $scope.projectParams = {
                'startPage': 1,
                'pageSize': pageSize
            };

            projectService.getAllProjects(
                function success(data) {
                    $scope.allProjects = data;
                },
                function error(err) {
                    notifyService.showError("Projects loading failed", err);
                }
            );

            //need for adding new issue
            projectService.getProjectById($routeParams.id,
                function success(data) {
                    $scope.projectData = data;
                },
                function error(err) {
                    notifyService.showError("Project loading failed", err);
                }
            );

            //need for adding new issue + hardcoded users too much users in database!?
            issueService.getAllUsers(
                function success(data) {
                    $scope.allUsers = [{"Id":"00040d32-9769-4c9a-909f-5d0773e77ee5","Username":"gosho.vitkov1@gmail.com","isAdmin":true}];
                },
                function error(err) {
                    notifyService.showError("Users loading failed", err);
                }
            );



            var user = authentication.getUserName();

            projectService.getProjectsByLeadId(user.Id, $scope.projectParams,
                function success(data) {
                    $scope.userLeadProjects = data.Projects;
                },
                function error(err) {
                    notifyService.showError("Project loading failed", err);
                }
            );

            $scope.newProjectSelected = function (id) {
                projectService.getProjectById(id,
                    function success(data) {
                        $scope.projectPriorities = data.Priorities;
                    },
                    function error(err) {
                        notifyService.showError("Project load failed", err);
                    }
                )
            };

          //add issue work with projectController!
            $scope.addIssue = function (issueData) {
                var labelsList = [];

                var stringLabels = issueData.Labels.split(', ');
                stringLabels.forEach(function (element) {
                    labelsList.push({Name: element.trim()})
                });

                issueData.Labels = labelsList;
                issueData.PriorityId = parseInt(issueData.PriorityId);
                issueData.ProjectId = parseInt(issueData.ProjectId);

                issueService.addNewIssue(issueData,
                    function success() {
                        notifyService.showInfo("Issue added successfully");

                        $location.path('/dashboard');
                    },
                    function error(err) {
                        notifyService.showError("Issue add failed", err);
                    }
                )
            };



        }]);

