angular.module('lottoApp')
    .service('NotificationService', ['$log', function($log) {

        // TODO : Add an optional second param to search function where the developer can log additional messages to the console.
        // Maybe for things they do not want to display to the user in the UI (e.g. maybe where the code was called from)

        var service = {};

        service.Success = Success;
        service.Info = Info;
        service.Warn = Warn;
        service.Alert = Alert;

        return service;

        // To hold the user-number to be checked
        function Success(msg, devmsg) {
            success(msg);
            $log.info(devmsg);
        }
        function Info(msg, devmsg) {
            info(msg);
            $log.info(devmsg);
        }
        function Warn(msg, devmsg) {
            warn(msg);
            $log.info(devmsg);
        }
        function Alert(msg, devmsg) {
            realbad(msg);
            $log.info(devmsg);
        }

        // private functions

        function success(contents) {
            notification(contents, 'success', 3000);
        }

        function info(contents) {
            notification(contents, 'info', 3000);
        }

        function warn(contents) {
            notification(contents, 'warn', 5000);
        }

        function realbad(contents) {
            notification(contents, 'alert', 5000);
        }

        function notification(contents, type, timeout) {
            if(! $('.alert-box').length) {
                $log.info('Notification: ' + contents);
                $('<div class="alert-box ' + type + '" >' + contents + '</div>').prependTo('body').delay(timeout).fadeOut(1000, function() {
                    $('.alert-box').remove();
                });
            };
        }
    }]);