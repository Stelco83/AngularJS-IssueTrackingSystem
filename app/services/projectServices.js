'use strict';

angular.module('ITS.userServices', ['ngRoute'])

    .factory('userServices', [
        '$http',
        'BASE_URL',
        'notifyService',

        function ($http, $q, BASE_URL) {

              function getUserIssues () {
                  var deferred = $q.defer();


                  $http.get(BASE_URL + '/issues/me?orderBy=Project.Name desc, ' +
                          'IssueKey&pageSize=2&pageNumber=1')
                      .then(function (response) {
                        console.log(response);

                      }, function (error) {

                      });


                  return deferred.promise;
            }

            return{
                getUserIssues : getUserIssues
            }
        }]);
