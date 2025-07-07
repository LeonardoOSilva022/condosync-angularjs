angular
  // 1. Injetamos o '$state' para podermos usar o redirecionamento do UI-Router
  .module("meuApp")
  .controller("LoginController", function ($scope, $state, $http, $window) {
    $scope.user = {
      email: "",
      password: "",
    };
    $scope.isSubmitting = false;
    $scope.loginError = null;

    $scope.handleSubmit = function () {
      $scope.isSubmitting = true;
      $scope.loginError = null;

      var email = $scope.user.email;
      var password = $scope.user.password;
      
      var fakeJwtToken;
      if (email === "joao@example.com" && password === "123456") {
        // Payload para SÍNDICO
        fakeJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvYW9AZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9hbyBTaWx2YSIsInJvbGUiOiJtYW5hZ2VyIn0.fakeManagerSignature";
      } else if (email === "maria@example.com" && password === "123456") {
        // Payload para MORADOR
        fakeJwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcmlhQGV4YW1wbGUuY29tIiwibmFtZSI6Ik1hcmlhIFNvdXphIiwicm9sZSI6InJlc2lkZW50In0.fakeResidentSignature";
      }

      if (fakeJwtToken) {
          $window.localStorage.setItem("token", fakeJwtToken);
          
          // 2. CORREÇÃO: Usamos o nome completo do estado 'app.dashboard'
          $state.go("app.dashboard"); 
      } else {
          $scope.loginError = "Email ou senha inválidos.";
      }
      
      $scope.isSubmitting = false;
    };
  });