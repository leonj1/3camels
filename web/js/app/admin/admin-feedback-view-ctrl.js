angular.module('lottoApp')
    .controller('AdminFeedbackViewController', ['$scope', '$state', '$http', '$localStorage', 'AdminService', 'NotificationService', '_getUserFeedback',
        function ($scope, $state, $http, $localStorage, AdminService, NotificationService, _getUserFeedback) {

            var feedback = _getUserFeedback.data;

            for (var i = 0; i < feedback.length; i++) {
                feedback[i].createDate = new Date(feedback[i].createDate);
            }
            $scope.comments = feedback;

            $scope.currentUser = angular.fromJson($localStorage.currentUser);
            if (!$scope.currentUser) {
                $state.go('login');
            }

            $scope.deleteNumber = function (itemId) {
                AdminService.DeleteFeedback(itemId)
                    .then(
                        function (data) {
                            $scope.comments = _.filter($scope.comments, function (o) {
                                return o.id !== itemId;
                            });
                            NotificationService.Info("Deleted number", data);
                        },
                        function (error) {
                            NotificationService.Alert("Unable to delete", error);
                        }
                    )
            };

        }]);
