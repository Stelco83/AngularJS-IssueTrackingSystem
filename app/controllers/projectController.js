'use strict';

angular.module('ITS.projectController',
    ['ngRoute', 'ITS.user.authentication', 'ITS.homeController']
)

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/:id', {
            templateUrl: 'templates/projectPage.html',
            controller: 'projectController'});

        $routeProvider.when('/projects/', {
            templateUrl: 'templates/allProjects.html',
            controller: 'projectController'
        });
        $routeProvider.when('/add/project', {
            templateUrl: 'templates/addProject.html',
            controller: 'projectController'
        });
        $routeProvider.when('/projects/:id/edit', {
            templateUrl: 'templates/editProject.html',
            controller: 'projectController'
        });
    }])

    .controller('projectController',
    ['$scope', 'authentication',
        '$location', 'notifyService', 'issueService', 'pageSize', '$routeParams',
        'projectService',
        function ($scope, authentication, $location, notifyService, issueService, pageSize, $routeParams, projectService) {

            $scope.projectParams = {
                'startPage': 1,
                'pageSize': 5
            };



        // need to load all projects without button;
            projectService.getAllProjectsPaging($scope.projectParams,
                function success(data) {
                    $scope.projects = data;
                    $scope.allProjects = data.TotalPages * $scope.projectParams.pageSize;
                },
                function error(err) {
                    notifyService.showError("Projects loading failed", err);
                });


            projectService.getAllProjects(
                function success(data) {
                    $scope.projectsInfo = data;
                },
                function error(err) {
                    notifyService.showError("Projects loading failed", err);
                });


            $scope.getProjectsAll = function () {
                projectService.getAllProjectsPaging($scope.projectParams,
                    function success(data) {
                        $scope.projects = data;
                        $scope.allProjects = data.TotalPages * $scope.projectParams.pageSize;
                    },
                    function error(err) {
                        notifyService.showError("Projects loading failed", err);
                    });
            };


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
                    $scope.allUsers = [
                        {"Id": "00040d32-9769-4c9a-909f-5d0773e77ee5", "Username": "gosho.vitkov1@gmail.com", "isAdmin": true}
                    ];
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




            //take issues directly without button click
            issueService.getUsersIssues($scope.projectParams,
                function success(data) {
                    $scope.userIssues = data.Issues;
                    $scope.allIssues = data.TotalPages * $scope.projectParams.pageSize;

                },
                function error(err) {
                    notifyService.showError("Issues loading failed", err);
                });


            $scope.getIssuesByProject = function () {
                issueService.getIssuesByProjectIdPaging($scope.projectParams, $routeParams.id,
                    function success(data) {
                        $scope.totalIssues = data.TotalPages * $scope.projectParams.pageSize;
                        $scope.issues = data.Issues;
                    },
                    function error(err) {
                        notifyService.showError("Issues loading failed", err);
                    }
                )
            };


            $scope.IssuesByProjectAll = function () {
                issueService.getIssuesByProjectAll($routeParams.id,
                    function success(data) {

                        $scope.issuesss = data.Issues;
                    },
                    function error(err) {
                        notifyService.showError("Issues loading failed", err);
                    }
                )
            };

            $scope.getIssuesByProject();

            $scope.editProject = function (editProjectData) {

                var labelsList = [];
                var prioritiesList = [];

                var stringLabels = editProjectData.Labels.split(', ');
                stringLabels.forEach(function (element) {
                    labelsList.push({Name: element.trim()})
                });

                var stringPriorities = editProjectData.Priorities.split(', ');
                stringPriorities.forEach(function (element) {
                    prioritiesList.push({Name: element.trim()})
                });

                editProjectData.Labels = labelsList;
                editProjectData.Id = $scope.projectData.Id;
                editProjectData.Priorities = prioritiesList;

                projectService.editProject(editProjectData,
                    function success () {
                    notifyService.showInfo("Project edited successfully");
                    $location.path("/projects/");

                }, function error(err) {
                    notifyService.showError("Edit project failed", err);
                })
            };


            $scope.addProject = function (projectData, projectKey) {
                var labelsList = [];
                var prioritiesList = [];

                var stringLabels = projectData.Labels.split(', ');
                stringLabels.forEach(function (element) {
                    labelsList.push({Name: element.trim()})
                });

                var stringPriorities = projectData.Priorities.split(', ');
                stringPriorities.forEach(function (element) {
                    prioritiesList.push({Name: element.trim()})
                });

                projectData.ProjectKey = projectKey;
                projectData.Priorities = prioritiesList;
                projectData.Labels = labelsList;

                projectService.addNewProject(projectData,
                    function success() {
                        notifyService.showInfo("Project added successfully");
                        $location.path("/projects/");
                    },
                    function error(err) {
                        notifyService.showError("Project add failed", err);
                    }
                )
            };

            $scope.setProjectKey = function (projectName) {
                if (projectName) {
                    var tokens = projectName.split(' ');
                    var result = "";
                    tokens.forEach(function (element) {
                        result += element.substring(0, 1)
                    });

                    $scope.projectKey = result;
                }
            }


        }]);

