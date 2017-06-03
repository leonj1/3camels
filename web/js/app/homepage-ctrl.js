angular.module('lottoApp')
    .controller('HomePageController', ['$scope', '$state', '$http', '$localStorage', '$log', 'LottoService', 'NotificationService',
        function ($scope, $state, $http, $localStorage, $log, LottoService, NotificationService) {
            $scope.game = {};

            $scope.placeholder = "";

            $scope.changePlaceholder = function (data) {
                if (data === 'Mega Millions') {
                    $scope.placeholder = "00 00 00 00 00";
                } else if (data === 'Powerball') {
                    $scope.placeholder = "11 11 11 11 11 11";
                }
            };

            $scope.check = function (data) {
                LottoService.Check(data)
                    .then(function (response) {
                        NotificationService.Info('Done: ' + response.data.status);
                        $scope.result = response.data;
                    })
                    .catch(function (error) {
                        NotificationService.Warn('Error: ' + error);
                    });
            }

        }]);
