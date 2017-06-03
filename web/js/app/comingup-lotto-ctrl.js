angular.module('lottoApp')
    .controller('ComingUpLottoController', ['$scope', '$state', '$http', '$localStorage', '$log', 'LottoService', 'NotificationService',
        function ($scope, $state, $http, $localStorage, $log, LottoService, NotificationService) {

            var todayDate = new Date(),
                dayOfWeek = todayDate.getDay(),
                schedule1 = {},
                schedule2 = {},
                nextPowerballDrawing = new Date(todayDate),
                nextMegaDrawing = new Date(todayDate),
                numDaysToAdd,
                drawingHour = 20,
                drawingMins = 0,
                drawingSecs = 0;

            // dayOfWeek is 0 indexed. 0 = Sun
            // give todays DOW and return the number of days to add for upcoming drawing
            // drawings that happen on wed + sat
            schedule1[0] = 3;
            schedule1[1] = 2;
            schedule1[2] = 1;
            schedule1[3] = 0;
            schedule1[4] = 2;
            schedule1[5] = 1;
            schedule1[6] = 0;

            // drawings that happen on tue + fri
            schedule2[0] = 2;
            schedule2[1] = 1;
            schedule2[2] = 0;
            schedule2[3] = 2;
            schedule2[4] = 1;
            schedule2[5] = 0;
            schedule2[6] = 3;

            // next powerball draw date - uses schedule 1
            numDaysToAdd = schedule1[dayOfWeek];
            nextPowerballDrawing.setDate(nextPowerballDrawing.getDate() + numDaysToAdd);
            nextPowerballDrawing.setHours(drawingHour, drawingMins, drawingSecs);
            powerballDiffMilli = nextPowerballDrawing - todayDate;
            if (powerballDiffMilli < 0) {
                numDaysToAdd++;
                nextPowerballDrawing.setDate(todayDate + numDaysToAdd);
                nextPowerballDrawing.setHours(drawingHour, drawingMins, drawingSecs);
                powerballDiffMilli = nextPowerballDrawing - todayDate;
            }
            console.log('Next Powerball Drawing: ' + nextPowerballDrawing);
            console.log('In milli: ' + powerballDiffMilli);

            // next mega draw date - uses schedule 2
            numDaysToAdd = schedule2[dayOfWeek];
            nextMegaDrawing.setDate(nextMegaDrawing.getDate() + numDaysToAdd);
            nextMegaDrawing.setHours(drawingHour, drawingMins, drawingSecs);
            megaDiffMilli = nextMegaDrawing - todayDate;
            if (megaDiffMilli < 0) {
                numDaysToAdd++;
                nextMegaDrawing.setDate(todayDate + numDaysToAdd);
                nextMegaDrawing.setHours(drawingHour, drawingMins, drawingSecs);
                megaDiffMilli = nextPowerballDrawing - todayDate;
            }
            console.log('Next Mega Drawing: ' + nextMegaDrawing);
            console.log('In milli: ' + megaDiffMilli);

            $scope.$broadcast('timer-start');
        }]);
