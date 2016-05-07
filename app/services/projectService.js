'use strict';
angular.module('ITS.user.projectService', ['ngRoute'])

    .factory('projectService', [
        '$http',
        'BASE_URL',
        'authentication',
        function ($http, BASE_URL, authentication) {

            return {

                getAllProjects: function (success, error) {
                    var request = {
                        method: 'GET',
                        url: BASE_URL + 'projects',
                        headers: authentication.getAuthHeaders()
                    };

                    $http(request).success(success).error(error);
                },



                getAllProjectsPagination: function (params, success, error) {
                    var getAllProjectsPagingRequest = {
                        method: 'GET',
                        url: BASE_URL + 'projects?pageSize=' + params.pageSize + '&pageNumber=' + params.startPage + '&filter=',
                        headers: authentication.getAuthHeaders()
                    };

                    $http(getAllProjectsPagingRequest).success(success).error(error);
                },

                getProjectById: function (id, success, error) {
                    if (id) {
                        var request = {
                            method: 'GET',
                            url: BASE_URL + 'projects/' + id,
                            headers: authentication.getAuthHeaders()
                        };

                        $http(request).success(success).error(error);

                    }
                },



                getLabels: function (success, error) {
                    var getLabelsRequest = {
                        method: 'GET',
                        url: BASE_URL + 'labels/?filter=',
                        headers: authentication.getAuthHeaders()
                    };
                    $http(getLabelsRequest).success(success).error(error);
                },

                getProjectsByLeadId: function (id, params, success, error) {
                    if (id) {
                        var getProjectsRequest = {
                            method: 'GET',
                            url: BASE_URL + 'projects/?filter=Lead.Id=' + '"' + id + '"' + '&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage,
                            headers: authentication.getAuthHeaders()
                        };
                        $http(getProjectsRequest).success(success).error(error);
                    }
                },


                editProject: function (projectData, success, error) {
                    var editProjectsRequest = {
                        method: 'PUT',
                        url: BASE_URL + 'projects/' + projectData.Id,
                        headers: authentication.getAuthHeaders(),
                        data: projectData
                    };

                    $http(editProjectsRequest).success(success).error(error);
                }




            }
        }

    ]);

