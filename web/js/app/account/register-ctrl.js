angular.module('lottoApp')
    .controller('RegisterController', ['$scope', '$state', 'UserService', 'NotificationService',
        function ($scope, $state, UserService, NotificationService) {

        $scope.registrationForm = null;

        $scope.register = function (formData) {
            var promise = UserService.Create(formData);

            if (promise) {
                promise.then(function (response) {
                        NotificationService.Alert("Please check your email", response.data);
                        $state.go('home');
                    }, function (error) {
                        NotificationService.Alert(error.data, "Server responded with some problem with the request to register the user: " + error.data);
                    }
                )
                .catch(function (error) {
                    NotificationService.Alert("Problem registering", error.data);
                });
            }
        };

    }]);