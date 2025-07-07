angular
  .module("meuApp")
  .controller("SettingsController", function ($scope, AuthService) {
    
    const currentUser = AuthService.currentUser() || {};
    $scope.user = currentUser;
    $scope.isManager = currentUser.role === 'manager';

    $scope.view = {
      tab: 'profile'
    };

    // Dados para os formulários de todas as abas
    $scope.formData = {
        name: $scope.user.name,
        email: "usuario@exemplo.com",
        phone: "(11) 98765-4321",
        condoName: "Residencial Jardim das Flores",
        condoCnpj: "12.345.678/0001-90",
        condoAddress: "Rua das Margaridas, 123",
        condoCityState: "São Paulo/SP",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    };

    $scope.notifications = {
        announcements: true,
        fees: true,
        reservations: true,
        messages: false
    };

    // Funções de ação (simuladas)
    $scope.saveProfile = function() { alert("Perfil salvo com sucesso! (Simulação)"); };
    $scope.saveNotificationPrefs = function() { alert("Preferências de notificação salvas! (Simulação)"); };
    $scope.saveCondoSettings = function() { alert("Configurações do condomínio salvas! (Simulação)"); };
    $scope.changePassword = function() {
        if ($scope.formData.newPassword !== $scope.formData.confirmPassword) {
            alert("A nova senha e a confirmação não são iguais.");
            return;
        }
        alert("Senha alterada com sucesso! (Simulação)");
    };

  });