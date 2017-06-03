angular.module('lottoApp')
    .controller('PowerballTicketController', ['$scope', '$log', 'NotificationService', 'ModalService',
        function($scope, $log, NotificationService, ModalService) {

            $scope.maxNumbers = 69;
            $scope.maxMultipliers = 24;
            $scope.selected = {};
            $scope.maxNumbers = 5;
            $scope.maxMultiplierNumbers = 1;

            var initIndex = function(data, prefix, max) {
                for (var i = 0; i < max; i++) {
                    data[prefix + i] = false;
                }
            };

            initIndex($scope.selected, "index", $scope.maxNumbers);

            $scope.range = function(min, max, step) {
                step = step || 1;
                var input = [];
                for (var i = min; i <= max; i += step) {
                    input.push(i);
                }
                return input;
            };

            // The user selected numbers
            $scope.chosen = [];
            $scope.multiplier = undefined;

            // This is what we need to do whenever a user selects a number
            $scope.selectNumber = function(num) {
                var index = $scope.chosen.indexOf(num);

                // if the provided number exists, then they want it removed
                if (index > -1) {
                    $scope.chosen.splice(index, 1);
                    $scope.selected["index" + num] = false;
                    return;
                }

                // Else, they want another number but we've reached a max
                if ($scope.chosen.length > ($scope.maxNumbers - 1)) {
                    NotificationService.Alert("Max number of selections reached.");
                    return;
                }

                $scope.chosen.push(num);
                $scope.selected["index" + num] = true;
            };

            $scope.selectMultiplier = function(num) {
                if ($scope.multiplier && $scope.multiplier === num) {
                    $scope.multiplier = undefined;
                    $scope.selected["multiplier" + num] = false;
                    return;
                }

                if ($scope.multiplier && $scope.multiplier !== num) {
                    NotificationService.Alert("Max number of selections reached.");
                    return;
                }

                $scope.multiplier = num;
                $scope.selected["multiplier" + num] = true;
            };

            $scope.showBadge = function(prefix, num) {
                return $scope.selected[prefix + num];
            };

            $scope.clearSelections = function() {
                var num,
                    index;

                for(var i = 0; $scope.chosen.length - 1; i++) {
                    num = $scope.chosen[i];
                    $scope.selected["index" + num] = false;
                    index = $scope.chosen.indexOf(num);
                    $scope.chosen.splice(index, 1);
                }

                NotificationService.Info("Selections cleared");
            };

            $scope.close = function() {
                ModalService.close();
            };

            $scope.done = function() {
                var data = {
                    numbers: $scope.chosen,
                    multiplier: $scope.multiplier
                };

                ModalService.setResults(data);
                ModalService.close();
            }
    }]);