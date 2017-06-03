angular.module('lottoApp')
    .controller('AdminUsersViewController', ['$scope', '$state', '$http', '$localStorage', 'AdminService', 'NotificationService', '_getUsers',
        function ($scope, $state, $http, $localStorage, AdminService, NotificationService, _getUsers) {

            var users = _getUsers.data;

            $scope.currentUser = angular.fromJson($localStorage.currentUser);

            if (!$scope.currentUser) {
                $state.go('login');
            }

            // make dates human readable
            // for (var i = 0; i < escalations.length; i++) {
            //     escalations[i].createDate = new Date(escalations[i].createDate);
            // }

            $scope.users = users;

        }]);
