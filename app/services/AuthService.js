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
        userPayload = null; // Garante que o payload está limpo se não houver token
        return false;
    }

    authService.getToken = function() { return $window.localStorage.getItem('token'); };
    
    authService.isLoggedIn = function() {
        // Apenas verifica se o token pode ser decodificado corretamente
        return decodeToken();
    };

    authService.currentUser = function() {
        if (!userPayload) {
            decodeToken();
        }
        // Retorna o payload completo, que inclui name, role, e unitNumber
        return userPayload;
    };
    
    authService.logout = function() {
        userPayload = null;
        $window.localStorage.removeItem('token');
    };

    return authService;
});