angular
  .module("meuApp")
  .controller("ResidentsController", function ($scope, $timeout, $state, AuthService, DataService) { // INJETAMOS O DATASERVICE
    
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

    // ===== AQUI ESTÁ A MUDANÇA PRINCIPAL =====
    // A lista de moradores agora vem da nossa fonte da verdade!
    $scope.residents = DataService.getResidents();

    // --- Funções Genéricas para Modais ---
    const openModal = (modalName, data = null) => {
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
        // No futuro, esta função chamará o DataService para adicionar o morador
        alert("Morador '" + $scope.newResident.name + "' adicionado com sucesso! (Simulação)");
        $scope.closeAllModals();
    };

    $scope.updateResident = function() {
        alert("Dados do morador '" + $scope.modals.edit.data.name + "' atualizados com sucesso! (Simulação)");
        $scope.closeAllModals();
    };

    $scope.deleteResident = function() {
        var residentName = $scope.modals.delete.data.name;
        // No futuro, esta função chamará o DataService para remover o morador
        $scope.residents = $scope.residents.filter(res => res.id !== $scope.modals.delete.data.id);
        alert("Morador '" + residentName + "' removido com sucesso! (Simulação)");
        $scope.closeAllModals();
    };
  });