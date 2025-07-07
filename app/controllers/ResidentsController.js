angular
  .module("meuApp")
  .controller("ResidentsController", function ($scope, $state, AuthService) {
    
    var currentUser = AuthService.currentUser();
    if (!currentUser || currentUser.role !== 'manager') {
        $state.go('app.dashboard');
        return; 
    }

    // ===== AQUI ESTÁ A CORREÇÃO: Classes de CSS atualizadas =====
    $scope.residents = [
        { name: "Ana Silva", unit: "101", phone: "(11) 99123-4567", email: "ana.silva@email.com", status: "Proprietário", statusClass: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20" },
        { name: "Roberto Santos", unit: "102", phone: "(11) 98765-4321", email: "roberto.santos@email.com", status: "Proprietário", statusClass: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20" },
        { name: "Carla Mendes", unit: "201", phone: "(11) 97654-3210", email: "carla.mendes@email.com", status: "Inquilino", statusClass: "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20" },
        { name: "Carlos Lima", unit: "203", phone: "(11) 91234-5678", email: "carlos.lima@email.com", status: "Proprietário", statusClass: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20" },
        { name: "Marcos Oliveira", unit: "304", phone: "(11) 98877-6655", email: "marcos.oliveira@email.com", status: "Proprietário", statusClass: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20" }
    ];

    $scope.removeResident = function(resident) {
      alert("A funcionalidade de remover '" + resident.name + "' seria implementada aqui.");
    };

  });