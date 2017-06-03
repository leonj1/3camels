angular.module('lottoApp')
    .controller('PasswordResetController', ['$scope', '$state', 'UserService', 'NotificationService',
        function ($scope, $state, UserService, NotificationService) {

        $scope.resetForm = null;

        $scope.resetPassword = function (formData) {
            var promise = UserService.PasswordReset(formData);

            if (promise) {
                promise
                    .then(function (response) {
                            NotificationService.Alert(response.data);
                            $state.go('home');
                        }, function (error) {
                            NotificationService.Alert(error.data, "Server responded with some problem with the request during password reset: " + error.data);
                        }
                    )
                    .catch(function (error) {
                        NotificationService.Alert("Problem resetting password", error.data);
                    });
            }
        };

    }]);