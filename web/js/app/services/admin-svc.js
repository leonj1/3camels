angular.module('lottoApp')
    .factory('AdminService', ['$http', '$state', '$localStorage', '$log', 'CONSTANTS',
        function ($http, $state, $localStorage, $log, CONSTANTS) {

            var baseUrl = CONSTANTS.PROTOCOL + CONSTANTS.API + ":" + CONSTANTS.PORT,
                service = {};

            service.PublishFeedback = PublishFeedback;
            service.GetFeedback = GetFeedback;
            service.DeleteFeedback = DeleteFeedback;
            service.GetUserEscalations = GetUserEscalations;
            service.GetUsers = GetUsers;

            return service;

            function GetUsers() {
                var targetResource = baseUrl + "/private/admin/users";
                return $http.get(targetResource);
            }

            function PublishFeedback(contents) {
                var targetResource = baseUrl + "/private/feedback";
                return $http.post(targetResource, contents);
            }

            function GetFeedback() {
                var targetResource = baseUrl + "/private/feedback";
                return $http.get(targetResource);
            }

            function GetUserEscalations() {
                var targetResource = baseUrl + "/private/user-escalations";
                return $http.get(targetResource);
            }

            function DeleteFeedback(id) {
                var targetResource = baseUrl + "/private/feedback/" + id;
                return $http.delete(targetResource);
            }

        }]);
