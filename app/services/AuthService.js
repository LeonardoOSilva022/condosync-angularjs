angular.module('meuApp').factory('AuthService', function($window) {
    var authService = {};
    var userPayload = null; // Cache para o payload do usuário

    function decodeToken() {
        var token = authService.getToken();
        if (token) {
            try {
                // Decodifica e armazena o payload para não fazer isso toda hora
                userPayload = JSON.parse(atob(token.split('.')[1]));
                return true;
            } catch (e) {
                userPayload = null;
                return false;
            }
        }
        return false;
    }

    authService.getToken = function() { return $window.localStorage.getItem('token'); };
    
    authService.isLoggedIn = function() {
        if (userPayload) {
            return true; // Se já temos o payload, está logado
        }
        return decodeToken(); // Se não, tenta decodificar
    };

    authService.currentUser = function() {
        if (!userPayload) {
            decodeToken(); // Garante que o payload foi carregado
        }
        return userPayload;
    };
    
    authService.logout = function() {
        userPayload = null;
        $window.localStorage.removeItem('token');
    };

    return authService;
});