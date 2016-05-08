'use strict';
angular.module('ITS.user.projectService', ['ngRoute'])

    .factory('projectService', [
        '$http',
        'BASE_URL',
        'authentication',
        function ($http, BASE_URL, authentication) {

            return {

                getAllProjectsPaging: function (params,success, error) {
                    var request = {
                        method: 'GET',
                        url: BASE_URL + 'projects?pageSize=' + params.pageSize + '&pageNumber=' + params.startPage + '&filter=',
                        headers: authentication.getAuthHeaders()
                    };

                    $http(request).success(success).error(error);
                },

                getAllProjects: function (success, error) {
                    var request = {
                        method: 'GET',
                        url: BASE_URL + 'projects',
                        headers: authentication.getAuthHeaders()
                    };

                    $http(request).success(success).error(error);
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
                    var request = {
                        method: 'GET',
                        url: BASE_URL + 'labels/?filter=',
                        headers: authentication.getAuthHeaders()
                    };
                    $http(request).success(success).error(error);
                },

                getProjectsByLeadId: function (id, params, success, error) {
                    if (id) {
                        var request = {
                            method: 'GET',
                            url: BASE_URL + 'projects/?filter=Lead.Id=' + '"' + id + '"' + '&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage,
                            headers: authentication.getAuthHeaders()
                        };
                        $http(request).success(success).error(error);
                    }
                },


                editProject: function (editProjectData, success, error) {
                    var request = {
                        method: 'PUT',
                        url: BASE_URL + 'projects/' + editProjectData.Id,
                        headers: authentication.getAuthHeaders(),
                        data: editProjectData
                    };

                    $http(request).success(success).error(error);
                },

                addNewProject: function (projectData, success, error) {
                    var request = {
                        method: 'POST',
                        url: BASE_URL + 'projects',
                        headers: authentication.getAuthHeaders(),
                        data: projectData
                    };

                    $http(request).success(success).error(error);
                }


            }
        }

    ]);

