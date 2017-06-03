angular.module('lottoApp')
    .controller('TrackingController', ['$scope', '$state', '$http', 'CONSTANTS', 'NotificationService', 'UserService', 'LottoService', '_beingTracked',
        function ($scope, $state, $http, CONSTANTS, NotificationService, UserService, LottoService, _beingTracked) {

            var numbers = _beingTracked.data;

            // set dates to be human readable
            for (var i = 0; i < numbers.length; i++) {
                numbers[i].create_date = new Date(numbers[i].create_date);
                numbers[i].drawDate = new Date(numbers[i].drawDate);
            }

            $scope.beingTracked = numbers;

            $scope.deleteNumber = function (itemId) {
                LottoService.Delete(itemId)
                    .then(
                        function (data) {
                            $scope.beingTracked = _.filter($scope.beingTracked, function (o) {
                                return o.id !== itemId;
                            });
                            NotificationService.Info("Deleted number", data.data);
                        },
                        function (error) {
                            NotificationService.Alert("Unable to delete", error.data);
                        }
                    )
            };

        }]);