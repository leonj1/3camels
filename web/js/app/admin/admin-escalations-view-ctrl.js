angular.module('lottoApp')
    .controller('AdminEscalationsViewController', ['$scope', '$state', '$http', '$localStorage', 'AdminService', 'NotificationService', '_getUserEscalations',
        function ($scope, $state, $http, $localStorage, AdminService, NotificationService, _getUserEscalations) {

            $scope.currentUser = angular.fromJson($localStorage.currentUser);

            if (!$scope.currentUser) {
                $state.go('login');
            }

            $scope.deleteNumber = function (itemId) {
                AdminService.DeleteFeedback(itemId)
                    .then(
                        function (data) {
                            NotificationService.Info("Deleted number", data.data);
                        },
                        function (error) {
                            NotificationService.Alert("Unable to delete", error.data);
                        }
                    )
            };

            var escalations = _getUserEscalations.data;

            // make dates human readable
            for (var i = 0; i < escalations.length; i++) {
                escalations[i].createDate = new Date(escalations[i].createDate);
            }

            $scope.escalations = escalations;

        }]);
