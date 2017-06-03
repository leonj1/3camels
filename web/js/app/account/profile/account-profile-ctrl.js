angular.module('lottoApp')
    .controller('AccountProfileController', ['$scope', '$state', '$localStorage', '$log', 'UserService', 'NotificationService',
        function ($scope, $state, $localStorage, $log, UserService, NotificationService) {

            $scope.currentUser = angular.fromJson($localStorage.currentUser);

            $scope.profileForm = $scope.currentUser;

            $scope.updateProfile = function(data) {
                var promise = UserService.Update(data);

                if (promise) {
                    promise.then(function(response) {
                        NotificationService.Info("Updated profile", response.data);
                        // update the local user reference here
                    })
                    .catch(function(error) {
                        if (error.status > 400 && error.status < 500) {
                            UserService.Logout();
                            NotificationService.Warn('Please login');
                            $state.go('login');
                        } else {
                            NotificationService.Warn('Error: ' + error.data);
                        }
                    })
                }
            };

        }]);