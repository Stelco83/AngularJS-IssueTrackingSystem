'use strict';

angular.module('ITS.user.authentication', ['ngRoute'])

    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        'notifyService',
        '$location',
        '$cookies',

        function ($http, $q, BASE_URL, notifyService, $location, $cookies) {

            var AUTHENTICATION_COOKIE_KEY = '-!!Auth.cookie.key!!-';

            function preserveUserData(data) {
                var accessToken = data.access_token;
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                $cookies.put(AUTHENTICATION_COOKIE_KEY, accessToken);
            }

            function registerUser(user) {

                var deferred = $q.defer();
                var email = user.email;
                var password = user.password;

                $http.post(BASE_URL + 'Account/Register', user)
                    .then(function (response) {
                        $http.post(BASE_URL + 'token', "userName=" + encodeURIComponent(email) +
                            "&password=" + encodeURIComponent(password) +
                            "&grant_type=password");

                        preserveUserData(response.data);
                        deferred.resolve(response.data);

                        notifyService.showInfo("Register successful.");
                        $location.path('#/user');

                    }, function (error) {

                        notifyService.showError("Invalid login", error);
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
                        "&grant_type=password")
                    .then(function (response) {

                        preserveUserData(response.data);
                        deferred.resolve(response.data);

                        notifyService.showInfo("Login successful.");
                        $location.path('#/user');

                    }, function (error) {
                        notifyService.showError("Invalid login", error);
                    });


                return deferred.promise;

            }

            function refreshCookie() {
                if(isAuthenticated()){
                    $http.defaults.headers.common.Authorization =
                        $cookies.get(AUTHENTICATION_COOKIE_KEY);
                }

            }

            function isAuthenticated() {
                return !!$cookies.get(AUTHENTICATION_COOKIE_KEY)
            }

            function logout() {
                $cookies.remove(AUTHENTICATION_COOKIE_KEY);
                if ($http.defaults.headers.common.Authorization != undefined) {
                    notifyService.showInfo("logout successful.")
                }
                $http.defaults.headers.common.Authorization = undefined;
                $location.path("#/home");

            }

            return{
                registerUser: registerUser,
                loginUser: loginUser,
                logout: logout,
                isAuthenticated: isAuthenticated,
                refreshCookie: refreshCookie
            }
        }]);
