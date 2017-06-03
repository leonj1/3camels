angular.module('lottoApp')
    .config(['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider',
        function ($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

            cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
            cfpLoadingBarProvider.spinnerTemplate = '<div><fa name="spinner"></fa>Loading...</div>';

            $urlRouterProvider.otherwise('/');

            $stateProvider

                .state('homepage', {
                    url: '/',
                    views: {
                        '': {
                            templateUrl: 'homepage/homepage.tpl.html',
                            controller: 'HomePageController'
                        },
                        'submitNumber@homepage': {
                            templateUrl: 'lotto/submit.tpl.html',
                            controller: 'SubmitLottoController'
                        },
                        'upcoming@homepage': {
                            templateUrl: 'lotto/comingup/main.tpl.html',
                            controller: 'ComingUpLottoController'
                        }
                    }
                })

                .state('profile', {
                    url: '/profile',
                    views: {
                        '': {
                            templateUrl: 'account/profile/settings.tpl.html'
                        },
                        'options@profile': {
                            templateUrl: 'account/profile/options.tpl.html'
                        },
                        'detail@profile': {
                            templateUrl: 'account/profile/profile.tpl.html',
                            controller: 'AccountProfileController'
                        }
                    }
                })

                .state('security', {
                    url: '/security',
                    views: {
                        '': {
                            templateUrl: 'account/profile/settings.tpl.html'
                        },
                        'options@security': {
                            templateUrl: 'account/profile/options.tpl.html'
                        },
                        'detail@security': {
                            templateUrl: 'account/profile/security.tpl.html',
                            controller: 'AccountSecurityController'
                        }
                    }
                })

                .state('notifications', {
                    url: '/notifications',
                    views: {
                        '': {
                            templateUrl: 'account/profile/settings.tpl.html'
                        },
                        'options@notifications': {
                            templateUrl: 'account/profile/options.tpl.html'
                        },
                        'detail@notifications': {
                            templateUrl: 'account/profile/notifications.tpl.html',
                            controller: 'AccountNotificationsController'
                        }
                    }
                })

                .state('admin_feedback', {
                    url: '/admin_feedback',
                    views: {
                        '': {
                            templateUrl: 'account/profile/settings.tpl.html'
                        },
                        'options@admin_feedback': {
                            templateUrl: 'admin/admin.tpl.html'
                        },
                        'detail@admin_feedback': {
                            templateUrl: 'admin/feedback-view.tpl.html',
                            controller: 'AdminFeedbackViewController',
                            resolve: {
                                _getUserFeedback: ['AdminService', function(AdminService) {
                                    return AdminService.GetFeedback();
                                }]
                            }
                        }
                    }
                })

                .state('admin_escalations', {
                    url: '/admin_escalations',
                    views: {
                        '': {
                            templateUrl: 'account/profile/settings.tpl.html'
                        },
                        'options@admin_escalations': {
                            templateUrl: 'admin/admin.tpl.html'
                        },
                        'detail@admin_escalations': {
                            templateUrl: 'admin/escalations-view.tpl.html',
                            controller: 'AdminEscalationsViewController',
                            resolve: {
                                _getUserEscalations: ['AdminService', function(AdminService) {
                                    return AdminService.GetUserEscalations();
                                }]
                            }
                        }
                    }
                })

                .state('admin_users', {
                    url: '/admin_users',
                    views: {
                        '': {
                            templateUrl: 'account/profile/settings.tpl.html'
                        },
                        'options@admin_users': {
                            templateUrl: 'admin/admin.tpl.html'
                        },
                        'detail@admin_users': {
                            templateUrl: 'admin/users-view.tpl.html',
                            controller: 'AdminUsersViewController',
                            resolve: {
                                _getUsers: ['AdminService', function(AdminService) {
                                    return AdminService.GetUsers();
                                }]
                            }
                        }
                    }
                })

                .state('home', {
                    url: '/home',
                    templateUrl: 'lotto/submit.tpl.html',
                    controller: 'SubmitLottoController'
                })

                .state('login', {
                    url: '/login',
                    templateUrl: 'account/login.tpl.html',
                    controller: 'LoginController'
                })

                .state('register', {
                    url: '/register',
                    templateUrl: 'account/register.tpl.html',
                    controller: 'RegisterController'
                })

                .state('forgot', {
                    url: '/forgot',
                    templateUrl: 'account/password-reset.tpl.html',
                    controller: 'PasswordResetController'
                })

                .state('tracking', {
                    url: '/tracking',
                    templateUrl: 'lotto/tracking.tpl.html',
                    controller: 'TrackingController',
                    resolve: {
                        _beingTracked: ['LottoService', function (LottoService) {
                            return LottoService.UnverifiedTickets();
                        }]
                    }
                })

                .state('history', {
                    url: '/history',
                    templateUrl: 'lotto/history.tpl.html',
                    controller: 'HistoryController',
                    resolve: {
                        _verifiedTickets: ['LottoService', function (LottoService) {
                            return LottoService.VerifiedTickets();
                        }]
                    }
                })

                .state('terms', {
                    url: '/terms',
                    templateUrl: 'legal/terms.tpl.html'
                })

                .state('privacy', {
                    url: '/privacy',
                    templateUrl: 'legal/privacy.tpl.html'
                })

                .state('feedback', {
                    url: '/feedback',
                    templateUrl: 'feedback/feedback.tpl.html',
                    controller: 'FeedbackController'
                })

                .state('admin', {
                    url: '/admin',
                    templateUrl: 'admin/admin.tpl.html',
                    controller: 'AdminController'
                })

                .state('routeerror', {
                    url: '/oops',
                    templateUrl: 'errors/route.tpl.html'
                });

        }]);
