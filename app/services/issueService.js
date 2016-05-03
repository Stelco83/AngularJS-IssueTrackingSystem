'use strict';
angular.module('ITS.user.issueService', ['ngRoute'])

    .factory('issueService', [
        '$http',
        'BASE_URL',
        'authentication',
        function ($http, BASE_URL, authentication) {

            return {
                getUsersIssues: function (params, success, error) {
                    var request = {
                        method: 'GET',
                        url: BASE_URL + 'issues/me?orderBy=Project.Name desc,IssueKey&pageSize=' + params.pageSize + '&pageNumber=' + params.startPage,
                        headers: authentication.getAuthHeaders()
                    };

                    $http(request).success(success).error(error);
                }
            }
        }]
);