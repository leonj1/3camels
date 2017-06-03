angular.module('lottoApp')
    .controller('HistoryController', ['$scope', '$state', 'LottoService', 'NotificationService', '_verifiedTickets',
        function ($scope, $state, LottoService, NotificationService, _verifiedTickets) {

            var numbers = _verifiedTickets.data;

            // set dates to be human readable
            for (var i = 0; i < numbers.length; i++) {
                numbers[i].create_date = new Date(numbers[i].create_date);
                numbers[i].drawDate = new Date(numbers[i].drawDate);
            }

            $scope.pastNumbers = numbers;

            $scope.deleteNumber = function (itemId) {
                LottoService.Delete(itemId)
                    .then(function (data) {
                        $scope.pastNumbers = _.filter($scope.pastNumbers, function(o) { return o.id !== itemId; });
                        NotificationService.Info("Deleted number", data.data);
                    })
                    .catch(function (error) {
                        NotificationService.Alert("Unable to delete", error.data);
                    })
            };
        }]);