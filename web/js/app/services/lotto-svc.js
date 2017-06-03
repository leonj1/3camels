angular.module('lottoApp')
    .service('LottoService', ['$http', '$log', '$state', 'NotificationService', 'CONSTANTS', 'UserService',
        function($http, $log, $state, NotificationService, CONSTANTS, UserService) {

        var baseUrl = CONSTANTS.PROTOCOL + CONSTANTS.API + ":" + CONSTANTS.PORT,
            service = {},
            numbers = {};

        service.VerifiedTickets = VerifiedTickets;
        service.UnverifiedTickets = UnverifiedTickets;
        service.ToBeChecked = ToBeChecked;
        service.isTracking = isTracking;
        service.Delete = Delete;
        service.Check = Check;
        service.Clear = Clear;

        return service;

        // To hold the user-number to be checked
        function ToBeChecked(userNumbers) {
            if (userNumbers) {
                numbers = userNumbers;
            } else {
                $log.warn('ToBeChecked() called with undefined value');
            }
        }

        // To clear the internal user-number to be checked
        function Clear() {
            numbers = undefined;
        }

        function Delete(id) {
            if (!id) {
                NotificationService.Alert("No id provided to delete", "id is undefined");
                return undefined;
            }
            var targetResource = baseUrl + "/private/number/" + id;
            return $http.delete(targetResource);
        }

        function Check(data) {
            var targetResource = baseUrl + "/private/check";
            if (!isTracking() && !data) {
                $log.info("Not checking anything since value is empty");
                return;
            }

            if (isTracking()) {
                data = numbers;
            }

            if (UserService.IsLoggedIn()) {
                var payload = {
                    numbers: data.numbers,
                    multiplier: data.multiplier,
                    ticket_date: data.gameDate,
                    game: data.game
                };

                return $http.post(targetResource, payload);
            } else {
                // if user is not logged in
                $log.info('About to persist: ' + data);
                this.ToBeChecked(data);
                NotificationService.Info("Let's login first");
                $state.go('login');
            }
        }

        // Inform the caller if we're currently holding a user-number to track
        function isTracking() {
            return numbers.numbers ? true : false;
        }

        // get tickets that have already been verified, we know the results
        function VerifiedTickets() {
            var targetResource = baseUrl + "/private/history";
            return $http.get(targetResource);
        }

        function UnverifiedTickets() {
            var targetResource = baseUrl + "/private/tracking";
            return $http.get(targetResource);
        }
    }]);