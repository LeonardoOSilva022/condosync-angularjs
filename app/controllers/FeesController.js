angular
  .module("meuApp")
  .controller("FeesController", function ($scope, $timeout, AuthService, DataService, PdfService) {
    
    const currentUser = AuthService.currentUser() || {};
    $scope.user = currentUser;
    $scope.isManager = currentUser.role === 'manager';

    // --- Controle de TODOS os Modais da Página ---
    $scope.modals = {
      unitFeeDetail: { isOpen: false, data: null }, // Para o síndico ver as taxas de uma unidade
      newFee: { isOpen: false }, // Para o síndico lançar nova taxa
      feeDetail: { isOpen: false, data: null }  // Para o morador ver uma taxa específica
    };

    // --- Dados para os Formulários ---
    $scope.newFeeData = {};

    // --- Lógica de Carregamento de Dados ---
    if ($scope.isManager) {
      $scope.unitsWithFees = DataService.getUnitsWithFees();
    } else {
      $scope.myFees = DataService.getFeesByUnitId(currentUser.unitId || 101);
    }

    $scope.getUnitStatus = function(unit) { /* ... (sem alterações) ... */ };

    // --- Funções dos Modais ---
    $scope.openUnitFeeDetailsModal = function(unit) {
        $scope.modals.unitFeeDetail.data = unit;
        $scope.modals.unitFeeDetail.isOpen = true;
        $timeout(lucide.createIcons, 0);
    };

    $scope.openNewFeeModal = function() {
        $scope.newFeeData = {}; // Limpa o formulário
        $scope.modals.newFee.isOpen = true;
        $timeout(lucide.createIcons, 0);
    };
    
    $scope.openResidentFeeDetailModal = function(fee) {
      $scope.modals.feeDetail.data = fee;
      $scope.modals.feeDetail.isOpen = true;
      $timeout(lucide.createIcons, 0);
    };

    $scope.closeAllModals = function() {
      $scope.modals.unitFeeDetail.isOpen = false;
      $scope.modals.newFee.isOpen = false;
      $scope.modals.feeDetail.isOpen = false;
    };

    // --- Funções de Ação ---
    $scope.generatePdf = function(fee) {
      PdfService.generateFeeReceipt(fee);
    };
    
    $scope.launchNewFee = function() {
        alert("Nova taxa para a unidade " + $scope.newFeeData.unit.apt + " lançada com sucesso! (Simulação)");
        $scope.closeAllModals();
    };

    // Preenchendo a função que faltava
    $scope.getUnitStatus = function(unit) {
      const pendingCount = unit.fees.filter(fee => fee.status === 'Pendente' || fee.status === 'Atrasado').length;
      if (pendingCount === 0) return { text: "Em dia", class: "bg-green-100 text-green-800" };
      return { text: `${pendingCount} pendência(s)`, class: "bg-yellow-100 text-yellow-800" };
    };
  });