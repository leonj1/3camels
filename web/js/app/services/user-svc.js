angular.module('lottoApp')
    .factory('UserService', ['$http', '$state', '$localStorage', '$log', 'CONSTANTS',
        function ($http, $state, $localStorage, $log, CONSTANTS) {

            var baseUrl = CONSTANTS.PROTOCOL + CONSTANTS.API + ":" + CONSTANTS.PORT,
                service = {},
                accountLoggedIn = undefined;

            service.Create = Create;
            service.Login = Login;
            service.Logout = Logout;
            service.SetCurrentUser = SetCurrentUser;
            service.IsLoggedIn = IsLoggedIn;
            service.PasswordReset = PasswordReset;
            service.PublishFeedback = PublishFeedback;
            service.UserEscalate = UserEscalate;
            service.Update = Update;

            return service;

            function Create(user) {
                var targetResource = baseUrl + "/public/users/register";
                return $http.post(targetResource, user);
            }

            function PublishFeedback(contents) {
                var targetResource = baseUrl + "/private/feedback";
                return $http.post(targetResource, contents);
            }

            function Update(user) {
                var targetResource = baseUrl + "/private/user";
                return $http.put(targetResource, user);
            }

            function Login(credentials) {
                var targetResource = baseUrl + "/public/users/login";
                return $http.post(targetResource, credentials);
            }

            function UserEscalate(contents) {
                var targetResource = baseUrl + "/private/escalate";
                return $http.post(targetResource, contents);
            }

            function Logout() {
                $localStorage.$reset();
                delete $http.defaults.headers.common.Authorization;
                accountLoggedIn = undefined;
            }

            function SetCurrentUser(user) {
                accountLoggedIn = user;
            }

            function IsLoggedIn() {
                return $localStorage.currentUser ? true : false;
            }

            function PasswordReset(email) {
                var targetResource = baseUrl + "/public/users/loggedout/resetpassword";
                return $http.post(targetResource, email);
            }
        }]);
