angular
  .module("meuApp")
  .controller("FeesController", function ($scope, $timeout, AuthService, DataService, PdfService) {
    
    // --- Inicialização ---
    const currentUser = AuthService.currentUser() || {};
    $scope.user = currentUser;
    $scope.isManager = currentUser.role === 'manager';

    // --- Objetos de Controle ---
    $scope.modals = {
      unitFeeDetail: { isOpen: false, data: null },
      feeDetail: { isOpen: false, data: null },
      newFee: { isOpen: false }
    };
    $scope.newFeeData = {};

    // --- Carregamento de Dados ---
    if ($scope.isManager) {
      $scope.unitsWithFees = DataService.getUnitsWithFees();
    } else {
      const myUnitId = currentUser.unitId || 101;
      $scope.myFees = DataService.getFeesByUnitId(myUnitId);
    }
    
    // --- Funções ---
    $scope.getUnitStatus = function(unit) {
      const pendingCount = unit.fees.filter(function(fee) { return fee.status === 'Pendente' || fee.status === 'Atrasado'; }).length;
      if (pendingCount === 0) return { text: "Em dia", class: "bg-green-100 text-green-800" };
      return { text: `${pendingCount} pendência(s)`, class: "bg-yellow-100 text-yellow-800" };
    };
    
    $scope.openUnitFeeDetailsModal = function(unit) {
        $scope.modals.unitFeeDetail.data = unit;
        $scope.modals.unitFeeDetail.isOpen = true;
        $timeout(lucide.createIcons, 0);
    };
    $scope.openFeeDetailsModal = function(fee) {
        $scope.modals.feeDetail.data = fee;
        $scope.modals.feeDetail.isOpen = true;
        $timeout(lucide.createIcons, 0);
    };
    $scope.openNewFeeModal = function() {
        $scope.newFeeData = {};
        $scope.modals.newFee.isOpen = true;
        $timeout(lucide.createIcons, 0);
    };
    $scope.closeAllModals = function() {
      $scope.modals.unitFeeDetail.isOpen = false;
      $scope.modals.feeDetail.isOpen = false;
      $scope.modals.newFee.isOpen = false;
    };
    $scope.generatePdf = function(fee) {
      PdfService.generateFeeReceipt(fee);
    };
    $scope.launchNewFee = function() {
        alert("Nova taxa lançada com sucesso! (Simulação)");
        $scope.closeAllModals();
    };
  });