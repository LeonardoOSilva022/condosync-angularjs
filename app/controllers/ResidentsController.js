angular
  .module("meuApp")
  .controller("ResidentsController", function ($scope, $timeout, $state, AuthService) {
    
    // --- Inicialização e Segurança ---
    const currentUser = AuthService.currentUser() || {};
    if (!currentUser || currentUser.role !== 'manager') {
        $state.go('app.dashboard'); 
        return; 
    }

    // --- Controle dos Modais ---
    $scope.modals = {
      add: { isOpen: false },
      edit: { isOpen: false, data: null },
      delete: { isOpen: false, data: null }
    };
    
    // --- Objeto para o formulário de novo morador ---
    $scope.newResident = {};

    // --- Dados Simulados ---
    $scope.residents = [
        { id: 1, name: "Ana Silva", unit: "101", phone: "(11) 99123-4567", email: "ana.silva@email.com", status: "Proprietário", statusClass: "bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20" },
        { id: 2, name: "Roberto Santos", unit: "102", phone: "(11) 98765-4321", email: "roberto.santos@email.com", status: "Proprietário", statusClass: "bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20" },
        { id: 3, name: "Carla Mendes", unit: "201", phone: "(11) 97654-3210", email: "carla.mendes@email.com", status: "Inquilino", statusClass: "bg-yellow-100 text-yellow-700 ring-1 ring-inset ring-yellow-600/20" },
    ];

    // --- Funções Genéricas para Modais ---
    const openModal = (modalName, data = null) => {
      // Cria uma cópia dos dados para edição, para não alterar o original até salvar
      if (data) $scope.modals[modalName].data = angular.copy(data);
      $scope.modals[modalName].isOpen = true;
      $timeout(lucide.createIcons, 0);
    };

    $scope.closeAllModals = function() {
      $scope.modals.add.isOpen = false;
      $scope.modals.edit.isOpen = false;
      $scope.modals.delete.isOpen = false;
    };

    // --- Funções Específicas dos Modais ---
    $scope.openAddModal = function() {
      $scope.newResident = {}; // Limpa o formulário
      openModal('add');
    };
    $scope.openEditModal = function(resident) { openModal('edit', resident); };
    $scope.openDeleteModal = function(resident) { openModal('delete', resident); };

    // --- Funções de Ação (Simuladas) ---
    $scope.addResident = function() {
        alert("Morador '" + $scope.newResident.name + "' adicionado com sucesso! (Simulação)");
        $scope.closeAllModals();
    };

    $scope.updateResident = function() {
        alert("Dados do morador '" + $scope.modals.edit.data.name + "' atualizados com sucesso! (Simulação)");
        $scope.closeAllModals();
    };

    $scope.deleteResident = function() {
        var residentName = $scope.modals.delete.data.name;
        // Lógica para remover o morador da lista $scope.residents
        $scope.residents = $scope.residents.filter(res => res.id !== $scope.modals.delete.data.id);
        alert("Morador '" + residentName + "' removido com sucesso! (Simulação)");
        $scope.closeAllModals();
    };
  });