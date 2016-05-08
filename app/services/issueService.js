'use strict';
angular.module('ITS.user.issueService', ['ngRoute'])

    .factory('issueService', [
        '$http',
        'BASE_URL',
        'authentication',
        function ($http, BASE_URL, authentication) {

            return {
                getUsersIssues: function (params,success, error) {
                    var request = {
                        method: 'GET',
                        url: BASE_URL + 'issues/me?orderBy=Project.Name desc,IssueKey&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage,
                        headers: authentication.getAuthHeaders()
                    };

                    $http(request).success(success).error(error);
                },


                getIssuesByProjectId: function (id ,success, error) {
                    if (id) {
                        var request = {
                            method: 'GET',
                            url: BASE_URL + 'projects/' + id + '/issues',
                            headers: authentication.getAuthHeaders()
                        };
                        $http(request).success(success).error(error);
                    }
                },

                getIssuesByProjectIdPaging: function (params, id, success, error) {
                    if (id) {
                        var request = {
                            method: 'GET',
                            url: BASE_URL + 'issues?pageSize=' + params.pageSize + '&pageNumber=' + params.startPage + '&filter=Project.Id==' + id,
                            headers: authentication.getAuthHeaders()
                        };
                        $http(request).success(success).error(error);
                    }
                },

                getIssuesByProjectAll: function ( id, success, error) {
                    if (id) {
                        var request = {
                            method: 'GET',
                            url: BASE_URL + 'projects/' + id + '/issues',
                            headers: authentication.getAuthHeaders()
                        };
                        $http(request).success(success).error(error);
                    }
                },


                getIssueById: function (id, success, error) {
                    if (id) {
                        var request = {
                            method: 'GET',
                            url: BASE_URL + 'issues/' + id,
                            headers: authentication.getAuthHeaders()
                        };
                        $http(request).success(function (response) {
                            var issueData = response;
                            var projectId = response.Project.Id;

                            var request = {
                                method: 'GET',
                                url: BASE_URL + 'projects/' + projectId,
                                headers: authentication.getAuthHeaders()
                            };

                            $http(request).success(function (response) {
                                issueData.projectLeaderName = response.Lead.Username;
                                issueData.projectPriorities = response.Priorities;
                                success(issueData);
                            }).error(error);
                        }).error(error);

                    }
                },

                changeIssueStatus: function (issueId, statusId, success, error) {
                    if (issueId && statusId) {
                        var request = {
                            method: 'PUT',
                            url: BASE_URL + 'issues/' + issueId + '/changestatus?statusId=' + statusId,
                            headers: authentication.getAuthHeaders()
                        };
                        $http(request).success(success).error(error);
                    }
                },

                editIssue: function (editIssueData, success, error) {
                    var request = {
                        method: 'PUT',
                        url: BASE_URL + 'issues/' + editIssueData.Id,
                        headers: authentication.getAuthHeaders(),
                        data: editIssueData
                    };

                    $http(request).success(success).error(error);
                },


                addCommentToIssue: function (Id, comment, success, error) {
                     {
                        var request = {
                            method: 'POST',
                            url: BASE_URL + 'issues/' + Id + '/comments',
                            headers: authentication.getAuthHeaders(),
                            data: comment
                        };
                        $http(request).success(success).error(error);
                    }
                },

                getCommentsById: function (id, success, error) {
                    if (id) {
                        var request = {
                            method: 'GET',
                            url: BASE_URL + 'issues/' + id + '/comments',
                            headers: authentication.getAuthHeaders()
                        };
                        $http(request).success(success).error(error);
                    }
                },

                addNewIssue: function (issueData, success, error) {
                    var request = {
                        method: 'POST',
                        url: BASE_URL + 'issues',
                        headers: authentication.getAuthHeaders(),
                        data: issueData
                    };

                    $http(request).success(success).error(error);
                },

                //need for adding issues
                getAllUsers: function (success, error) {
                    var response = {
                        method: 'GET',
                        url: BASE_URL + 'users',
                        headers: authentication.getAuthHeaders()
                    };
                    $http(response).success(success).error(error);
                }






            }
        }

    ]
);