'use strict';

angular.module('ITS.user.authentication', ['ngRoute'])

    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        'notifyService',
        '$cookies',

        function ($http, $q, BASE_URL, notifyService, $cookies) {

            var AUTHENTICATION_COOKIE_KEY = '-!!Auth.cookie.key!!-';
            var currentUser;
            var accessToken;


            function preserveUserData(data) {
                accessToken = data.access_token;
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);
            }

            function registerUser(user) {

                var deferred = $q.defer();
                var email = user.email;
                var password = user.password;

                currentUser = $http.post(BASE_URL + 'api/Account/Register', user)
                    .then(function (response) {
                        $http.post(BASE_URL + 'token', "userName=" + encodeURIComponent(email) +
                            "&password=" + encodeURIComponent(password) +
                            "&grant_type=password");
                        currentUser = response.data;
                        preserveUserData(response.data);
                        deferred.resolve(response.data);

                        notifyService.showInfo("Register successful.");


                    }, function (error) {

                        notifyService.showError("Invalid register", error);
                    });


                return deferred.promise;
            }

            function loginUser(user) {

                var deferred = $q.defer();

                var email = user.email;
                var password = user.password;

                $http.post(BASE_URL + 'api/token',
                        "userName=" + encodeURIComponent(email) +
                        "&password=" + encodeURIComponent(password) +
                        "&grant_type=password")
                    .then(function (response) {
                        currentUser = response.data;
                        preserveUserData(response.data);
                        deferred.resolve(response.data);
                        notifyService.showInfo("Login successful.");

                        $http.defaults.headers.common.Authorization = 'bearer ' + accessToken;
                        $http.get(BASE_URL + 'users/me')
                            .then(function (response) {
                                currentUser = response.data;
                                deferred.resolve(response);

                                console.log(currentUser);
                            }, function (error) {


                            });

                    }, function (error) {
                        notifyService.showError("Invalid login", error);
                    });


                return deferred.promise;

            }

            function logout() {
                $cookies.remove(AUTHENTICATION_COOKIE_KEY);
                if ($http.defaults.headers.common.Authorization != undefined) {
                    notifyService.showInfo("logout successful.")
                }
                $http.defaults.headers.common.Authorization = undefined;

            }

            function refreshCookie() {
                if (isAuthenticated()) {
                    $http.defaults.headers.common.Authorization =
                        $cookies.get(AUTHENTICATION_COOKIE_KEY);
                }

            }

            function isAuthenticated() {
                return !!$cookies.get(AUTHENTICATION_COOKIE_KEY);

            }


            function isNormalUser() {
                return (currentUser != undefined) && (!currentUser.isAdmin)

            }

            function isAdmin() {
                return (currentUser != undefined) && (currentUser.isAdmin)

            }

            function isProjectLeader() {
                return (currentUser != undefined) && (currentUser.isProjectLeader)

            }

            function getAllUsers() {
                var deferred = $q.defer();
                $http.defaults.headers.common.Authorization = 'bearer ' + accessToken;
                $http.get(BASE_URL + 'users/')
                    .then(function (response) {
                        deferred.resolve(response);

                    }, function (error) {


                    });

                return deferred.promise;
            }




            return{
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout,
                isAuthenticated: isAuthenticated,
                refreshCookie: refreshCookie,
                isNormalUser: isNormalUser,
                isAdmin: isAdmin,
                isProjectLeader: isProjectLeader,
                getAllUsers: getAllUsers
            }
        }]);
