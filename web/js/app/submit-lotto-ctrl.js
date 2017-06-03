angular.module('lottoApp')
    .controller('SubmitLottoController', ['$scope', '$rootScope', '$log', '$state', '$localStorage', '$fancyModal', 'LottoService', 'UserService', 'NotificationService', 'ModalService',
        function ($scope, $rootScope, $log, $state, $localStorage, $fancyModal, LottoService, UserService, NotificationService, ModalService) {

            $scope.currentUser = angular.fromJson($localStorage.currentUser);

            if (!$scope.currentUser) {
                $state.go('homepage');
            }

            $scope.openResponsiveMenu = false;

            $scope.numbersForm = {};

            $scope.showLottoNumber = false;

            $scope.openBurger = function () {
                $scope.openResponsiveMenu = !$scope.openResponsiveMenu;
            };

            $scope.$watch(function () {
                return $localStorage.currentUser;
            }, function (newVal, oldVal) {
                if (oldVal !== newVal) {
                    $log.info('Resetting currentUser since not in sync with localStorage');
                    $scope.currentUser = angular.fromJson($localStorage.currentUser);
                }
            });

            if (LottoService.isTracking() && $scope.currentUser) {
                NotificationService.Info("Saving number to be checked");
                LottoService.Check()
                    .then(function (data) {
                        $scope.result = data;
                        $log.info('Result after posting the number to be checked: ' + $scope.result.status);
                        // Once we have submitted the numbers for tracking we no longer need to track it.
                        LottoService.Clear();
                    })
                    .catch(function (error) {
                        NotificationService.Warn('Bad: ' + error.data);
                    });
            }

            $scope.numbers = "";

            $scope.status = "";

            $scope.myDate = "";

            $scope.logout = function () {
                UserService.Logout();
                $log.info('Done logging user off. Reloading home.');
                // this has to be a different state than the current one, else does not work
                $state.reload('home');
            };

            $scope.check = function (data) {
                if (data.game === 'Mega Millions') {
                    data.game = 'mega millions';
                }
                LottoService.Check(data)
                    .then(function (response) {
                        NotificationService.Info(response.data.status);
                        $scope.result = response.data;
                    })
                    .catch(function (error) {
                        NotificationService.Warn('Error: ' + error);
                    });
            };

            $scope.openTicketInput = function (game) {
                var modal;
                // Track the modal so we can close it from somewhere else if needed
                if (game === 'powerball') {
                    modal = $fancyModal.open({
                        templateUrl: 'lotto/tickets/powerball.tpl.html',
                        controller: 'PowerballTicketController',
                        closeOnEscape: true
                    });
                } else if (game === 'mega') {
                    modal = $fancyModal.open({
                        templateUrl: 'lotto/tickets/mega-millions.tpl.html',
                        controller: 'PowerballTicketController',
                        closeOnEscape: true
                    });
                }
                ModalService.setModal(modal);
            };

            $rootScope.$on('$fancyModal.closed', function (e, id) {
                var res = ModalService.getResults();

                if (res.numbers) {
                    $scope.numbersForm.numbers = res.numbers.sort().toString().replace(/,/g, ' ');
                    $scope.numbersForm.multiplier = res.multiplier;
                    $scope.showLottoNumber = true;
                    $scope.$apply();
                }
            });

        }]);
