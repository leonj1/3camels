angular.module('lottoApp')
    .controller('AccountSecurityController', ['$scope', '$state', '$localStorage', 'UserService', 'NotificationService',
        function ($scope, $state, $localStorage, UserService, NotificationService) {

            $scope.currentUser = angular.fromJson($localStorage.currentUser);

            $scope.passwordForm = $scope.currentUser;

            $scope.changePassword = function(data) {
                var promise = UserService.Update(data);

                if (promise) {
                    promise.then(function(response) {
                        NotificationService.Info("Password Changed", response.data);
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
            }
        }]);
