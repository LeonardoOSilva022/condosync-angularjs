angular
  .module("meuApp")
  .controller("FeesController", function ($scope, $timeout, AuthService, PdfService, DataService) { // INJETAMOS O DATASERVICE
    
    const currentUser = AuthService.currentUser() || {};
    $scope.user = currentUser;
    $scope.isManager = currentUser.role === 'manager';

    $scope.modals = {
      feeDetail: { isOpen: false, data: null },
      newFee: { isOpen: false }
    };

    // ===== MUDANÇA PRINCIPAL =====
    // Os dados agora vêm da nossa fonte da verdade!
    $scope.unitsWithFees = DataService.getUnitsWithFees();

    $scope.getUnitStatus = function(unit) {
      const pendingCount = unit.fees.filter(fee => fee.status === 'Pendente' || fee.status === 'Atrasado').length;
      if (pendingCount === 0) return { text: "Em dia", class: "bg-green-100 text-green-800" };
      return { text: `${pendingCount} pendência(s)`, class: "bg-yellow-100 text-yellow-800" };
    };
    
    // O resto das funções (modais, PDF, etc.) continuam iguais...
    $scope.openFeeDetailsModal = function(fee) { /* ... */ };
    $scope.openNewFeeModal = function() { /* ... */ };
    $scope.closeAllModals = function() { /* ... */ };
    $scope.generatePdf = function(fee) { /* ... */ };
    $scope.launchNewFee = function() { /* ... */ };
  });