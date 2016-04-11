'use strict';

angular.module('ITS.user.authentication', ['ngRoute'])

    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

        function registerUser(user) {
            var deferred = $q.defer();
            $http.post(BASE_URL + 'users/Register', user)
                .then(function (response) {
                    deferred.resolve(response.data)
                }, function (error) {


                });


            return deferred.promise;
        }

        function loginUser(user) {

            var deferred = $q.defer();
            $http.post(BASE_URL + 'users/Login', user)
                .then(function (response) {
                    deferred.resolve(response.data)
                }, function (error) {


                });

            return deferred.promise;

        }

        function logout() {

        }

        return{
            registerUser: registerUser,
            loginUser: loginUser,
            logout: logout
        }
    }]);
