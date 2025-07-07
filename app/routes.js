app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    // O resolve agora apenas checa se o usuário está logado.
    // É mais simples e evita o erro de transição.
    const authCheck = {
        auth: function($q, $state, AuthService) {
            if (AuthService.isLoggedIn()) {
                return $q.resolve();
            } else {
                $state.go('login');
                return $q.reject();
            }
        }
    };

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/views/login.html',
            controller: 'LoginController'
        })
        .state('app', {
            abstract: true,
            templateUrl: 'app/views/main.html',
            // O controller da sidebar será carregado pelo próprio template (main.html)
        })
        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'app/views/dashboard.html',
            controller: 'DashboardController',
            resolve: authCheck // Protegemos o estado do dashboard
        })
        .state('app.units', { 
            url: '/units',
            templateUrl: 'app/views/units.html',
            controller: 'UnitsController',
            resolve: authCheck // Protege o estado
        })
        .state('app.residents', { 
            url: '/residents',
            templateUrl: 'app/views/residents.html',
            controller: 'ResidentsController',
            resolve: authCheck 
        })
        .state('app.fees', { 
            url: '/fees',
            templateUrl: 'app/views/fees.html',
            controller: 'FeesController',
            resolve: authCheck 
        })
        .state('app.announcements', { 
            url: '/announcements',
            templateUrl: 'app/views/announcements.html',
            controller: 'AnnouncementsController',
            resolve: authCheck 
        })
        .state('app.reservations',{
            url: '/reservations',
            templateUrl: 'app/views/reservations.html',
            controller: 'ReservationsController',
            resolve: authCheck
        })
        .state('app.messages',{
            url: '/messages',
            templateUrl: 'app/views/messages.html',
            controller: 'MessagesController',
            resolve: authCheck
        })
        .state('app.complaints', { 
            url: '/complaints',
            templateUrl: 'app/views/complaints.html',
            controller: 'ComplaintsController',
            resolve: authCheck 
        })
        .state('app.settings', { 
            url: '/settings',
            templateUrl: 'app/views/settings.html',
            controller: 'SettingsController',
            resolve: authCheck 
        });

        // Outros estados como 'app.units' também usarão 'resolve: authCheck'
}]);