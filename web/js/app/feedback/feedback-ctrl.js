angular.module('lottoApp')
    .controller('FeedbackController', ['$scope', '$state', '$http', '$localStorage', 'UserService', 'NotificationService',
        function ($scope, $state, $http, $localStorage, UserService, NotificationService) {

            $scope.currentUser = angular.fromJson($localStorage.currentUser);

            $scope.feedbackForm = null;

            if (!$scope.currentUser) {
                $state.go('login');
            }

            $scope.publish = function (contents) {
                if (!contents) {
                    NotificationService.Warn("Must provide some contents");
                    return;
                }

                UserService.PublishFeedback(contents)
                    .success(function (response) {
                        NotificationService.Info(response, "Feedback submitted successfully");
                        $scope.feedbackForm.contents = "";
                    })
                    .error(function (error) {
                        NotificationService.Info("Problem saving user feedback", error);
                    });
            }

        }]);
