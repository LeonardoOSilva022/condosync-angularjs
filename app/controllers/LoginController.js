angular
  .module("meuApp")
  .controller("LoginController", function ($scope, $state, $window, AuthService) {
    $scope.user = { email: "", password: "" };
    $scope.isSubmitting = false;
    $scope.loginError = null;

    $scope.handleSubmit = function () {
      // ... (lógica de login que já temos) ...
      var email = $scope.user.email;
      var password = $scope.user.password;
      var fakeJwtToken;
      if (email === "joao@example.com" && password === "123456") {
        // Payload SÍNDICO (sem unitNumber)
        fakeJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9hbyBTaWx2YSIsInJvbGUiOiJtYW5hZ2VyIn0.fakeManagerSignature";
      } else if (email === "maria@example.com" && password === "123456") {
        // Payload MORADOR (COM unitNumber)
        fakeJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmlhQGV4YW1wbGUuY29tIiwibmFtZSI6Ik1hcmlhIFNvdXphIiwicm9sZSI6InJlc2lkZW50IiwidW5pdE51bWJlciI6IjEwMSJ9.fakeResidentSignature";
      }

      if (fakeJwtToken) {
          $window.localStorage.setItem("token", fakeJwtToken);
          
          // ===== AQUI ESTÁ A CORREÇÃO CRUCIAL =====
          // Avisa ao AuthService para ler o novo token e atualizar os dados
          AuthService.updateUserFromToken();
          
          $state.go("app.dashboard"); 
      } else {
          $scope.loginError = "Email ou senha inválidos.";
      }
      
      $scope.isSubmitting = false;
    };
  });