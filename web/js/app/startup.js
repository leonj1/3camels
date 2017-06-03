// holds the cached html templates
angular.module('templates', []);

angular.module('lottoApp', [
    'ui.router',
    'templates',
    'ngStorage',
    'moment-picker',
    'picardy.fontawesome',
    'vesparny.fancyModal',
    'angular-loading-bar',
    'angular-jwt',
    'timer'
]);

angular.module('lottoApp')
    .run(['$http', '$state', '$location', '$rootScope', '$localStorage', 'DebugState', 'UserService', 'NotificationService',
        function ($http, $state, $location, $rootScope, $localStorage, DebugState, UserService, NotificationService) {
            // Helpful to show/hide spinners
            var resolveDone = function () {
                $rootScope.doingResolve = false;
            };
            $rootScope.doingResolve = false;

            // Enable $state route changes
            DebugState.active = false;

            // keep user logged in after page refresh
            $rootScope.currentUser = $localStorage.currentUser || undefined;

            if ($rootScope.currentUser) {
                $http.defaults.headers.common['Authorization'] = "Bearer " + $rootScope.currentUser.token; // jshint ignore:line
            }

            $rootScope.$on('$stateChangeStart', function () {
                $rootScope.doingResolve = true;
            });

            $rootScope.$on('$stateChangeSuccess', resolveDone);
            // $rootScope.$on('$statePermissionError', resolveDone);

            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                var msg = "$stateChangeError: (" + arguments[3].name + ") -> (" + arguments[1].name + ")",
                    contents = {
                        message: msg,
                        method: arguments[5].config.method
                    };

                if (error.status === 401 || error.status === 403) {
                    NotificationService.Warn("Please login again", error.data);
                    UserService.Logout();
                    $state.go('login');
                    return;
                }

                UserService.UserEscalate(contents)
                    .success(function() {
                        console.log("Bat signal raised");
                    })
                    .error(function(error) {
                        console.log("Could not raise Bat Signal. More problems? " + error);
                    });

                console.log(msg);
                console.log(arguments);
                resolveDone();
                $state.go('routeerror');
            });

// $rootScope.$on('$locationChangeStart', function (event, next, current) {
//     // redirect to login page if not logged in and trying to access a restricted page
//     var restrictedPage = $.inArray($location.path(), ['/login', '/register', '/home', '/', '']) === -1,
//         loggedOutPages = $.inArray($location.path(), ['/login', '/register']) === 0,
//         loggedIn = $rootScope.currentUser;
//     if (restrictedPage && !loggedIn) {
//         console.log('Restricted page (' + $location.path() + ') and user is not logged in: ' + $location.path());
//         console.log('Restricted page name length: ' + $location.path().length);
//         $state.transitionTo('login');
//     } else if (loggedOutPages && loggedIn) {
//         // an already logged in user does not need login or registration pages
//         console.log('User is already logged in and should no be routed here: ' + $location.path() + ' as ' + $rootScope.currentUser.firstname);
//         console.log('Token is: ' + $localStorage.currentUser.token);
//         $state.transitionTo('home');
//         console.log('End of transitioning since user was already logged in');
//     } else if (current.name != undefined && next.name === current.name) {
//         console.log('Reloading: ' + current.name);
//         $state.reload(current.name);
//         console.log('End of reload');
//     } else {
//         if (loggedIn) {
//             console.log('Is user logged in? ' + loggedIn);
//             console.log('Is user logged in? ' + $rootScope.currentUser.firstname);
//         } else {
//             console.log('No one is logged in');
//         }
//     }
// });
        }])
;