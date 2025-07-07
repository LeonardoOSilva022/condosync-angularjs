angular.module('meuApp').factory('AuthService', function($window) {
    var authService = {};
    var userPayload = null; // Cache para guardar os dados do usuário

    // Função interna e segura para ler o token
    function decodeToken() {
        var token = authService.getToken();
        if (token) {
            try {
                // Decodifica e armazena o payload para não fazer isso toda hora
                userPayload = JSON.parse(atob(token.split('.')[1]));
                return true;
            } catch (e) {
                authService.logout(); // Limpa tudo se o token for inválido
                return false;
            }
        }
        userPayload = null;
        return false;
    }

    authService.getToken = function() { return $window.localStorage.getItem('token'); };
    
    authService.isLoggedIn = function() {
        return decodeToken();
    };

    authService.currentUser = function() {
        // Garante que sempre retornemos os dados mais recentes
        if (!userPayload) {
            decodeToken();
        }
        return userPayload;
    };
    
    authService.logout = function() {
        userPayload = null;
        $window.localStorage.removeItem('token');
    };

    // Função crucial para forçar a atualização após o login
    authService.updateUserFromToken = function() {
        return decodeToken();
    };

    return authService;
});