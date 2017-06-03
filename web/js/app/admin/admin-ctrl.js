angular.module('lottoApp')
    .controller('AdminController', ['$scope', '$state', '$http', '$localStorage',
        function ($scope, $state, $http, $localStorage) {

            $scope.currentUser = angular.fromJson($localStorage.currentUser);

            if (!$scope.currentUser) {
                $state.go('login');
            }

        }]);
