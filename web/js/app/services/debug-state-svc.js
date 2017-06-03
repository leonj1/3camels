angular.module('lottoApp')
    .factory("DebugState", ["$rootScope", function ($rootScope) {
        var handler = { active: false };
        handler.toggle = function () { handler.active = !handler.active; };
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if (handler.active) {
                console.log("$stateChangeStart: (" + arguments[3].name + ") -> (" + arguments[1].name + ")");
                // console.log(arguments);
            }
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (handler.active) {
                console.log("$stateChangeSuccess: (" + arguments[3].name + ") -> (" + arguments[1].name + ")");
            }
        });
        // $rootScope.$on('$viewContentLoading', function (event, viewConfig) {
        //     if (handler.active) {
        //         console.log("$viewContentLoading --- event, viewConfig");
        //         console.log(arguments);
        //     };
        // });
        // $rootScope.$on('$viewContentLoaded', function (event) {
        //     if (handler.active) {
        //         console.log("$viewContentLoaded --- event");
        //         console.log(arguments);
        //     };
        // });
        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            if (handler.active) {
                console.log("$stateNotFound --- event, missingState, fromState, fromParams");
                console.log(arguments);
            }
        });

        return handler;
    }]);