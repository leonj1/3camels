angular.module('lottoApp')
    .controller('LoginController', ['$scope', '$http', '$state', '$localStorage', '$log', 'UserService', 'NotificationService', 'jwtHelper',
        function ($scope, $http, $state, $localStorage, $log, UserService, NotificationService, jwtHelper) {

            $scope.loginForm = null;

            $scope.login = function (formData) {
                UserService.Login(formData)
                    .then(function (res) {
                        // login successful if there's a token in the response
                        if (res.data.token) {
                            // store username and token in local storage to keep user logged in between page refreshes

                            var tokenPayload = jwtHelper.decodeToken(res.data.token),
                                arr_from_json = JSON.parse(tokenPayload.sub);

                            $localStorage.currentUser = {
                                'firstname': res.data.firstname,
                                'lastname': res.data.lastname,
                                'token': res.data.token,
                                'userId': arr_from_json.userId,
                                'userName': arr_from_json.userName,
                                'userType': arr_from_json.userType,
                                'userLoginTime': arr_from_json.userLoginTime
                            };

                            UserService.SetCurrentUser($localStorage.currentUser);

                            // add jwt token to auth header for all requests made by the $http service
                            $http.defaults.headers.common.Authorization = 'Bearer ' + res.data.token;

                            $state.go('home');
                        } else {
                            NotificationService.Alert("Problem during login", "No token received from server");
                        }
                    })
                    .catch(function (error) {
                        NotificationService.Alert("Unable to login", error.data);
                    });
            }

        }]);