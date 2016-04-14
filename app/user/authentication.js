'use strict';

angular.module('ITS.user.authentication', ['ngRoute'])

    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',

        function ($http, $q, BASE_URL) {

            var isLogged = false;

            function registerUser(user) {

                var deferred = $q.defer();
                var email = user.email;
                var password = user.password;

                $http.post(BASE_URL + 'Account/Register', user)
                    .then(function (success) {
                        $http.post(BASE_URL + 'token', "userName=" + encodeURIComponent(email) +
                            "&password=" + encodeURIComponent(password) +
                            "&grant_type=password" );
                        deferred.resolve()

                    }, function (error) {


                    });


                return deferred.promise;
            }

            function loginUser(user) {

                var deferred = $q.defer();

                var email = user.email;
                var password = user.password;

               $http.post(BASE_URL + 'token',
                        "userName=" + encodeURIComponent(email) +
                    "&password=" + encodeURIComponent(password) +
                    "&grant_type=password" )
                    .then(function (success) {

                        deferred.resolve(success.data);

                        isLogged = true;

                    } , function (error) {
                        isLogged = false;

                });


                return deferred.promise;

            }

            function isLoggedIn () {
               return  isLogged

            }

            function logout() {

            }

            return{
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout,
                isLoggedIn : isLoggedIn
            }
        }]);
