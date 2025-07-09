angular
  .module("meuApp")
  .controller("FeesController", function ($scope, $timeout, AuthService, DataService, PdfService) {
    
    // --- Inicialização ---
    const currentUser = AuthService.currentUser() || {};
    $scope.user = currentUser;
    $scope.isManager = currentUser.role === 'manager';

    // --- Objetos de Controle ---
    $scope.modals = {
      feeDetail: { isOpen: false, data: null },
      newFee: { isOpen: false }
    };
    $scope.filter = {
      startDate: null,
      endDate: null
    };

    // --- Carregamento de Dados ---
    let allDataForView = []; 
    if ($scope.isManager) {
      $scope.unitsWithFees = DataService.getUnitsWithFees();
      allDataForView = $scope.unitsWithFees;
    } else {
      const myUnitId = currentUser.unitId || 101;
      $scope.myFees = DataService.getFeesByUnitId(myUnitId);
      allDataForView = $scope.myFees;
    }
    $scope.displayedData = allDataForView; // A lista que a view irá mostrar
    
    // --- Funções de Cálculo e Status ---
    $scope.getUnitStatus = function(unit) {
      const pendingCount = unit.fees.filter(fee => fee.status === 'Pendente' || fee.status === 'Atrasado').length;
      if (pendingCount === 0) return { text: "Em dia", class: "bg-green-100 text-green-800" };
      return { text: `${pendingCount} pendência(s)`, class: "bg-yellow-100 text-yellow-800" };
    };

    // --- Função de Filtro por Data ---
    $scope.applyDateFilter = function() {
      if (!$scope.filter.startDate || !$scope.filter.endDate) {
        $scope.displayedData = allDataForView;
        return;
      }
      const start = new Date($scope.filter.startDate);
      const end = new Date($scope.filter.endDate);

      if ($scope.isManager) {
        // Filtra as unidades, mantendo apenas aquelas que têm taxas no período
        $scope.displayedData = allDataForView.map(unit => {
          const filteredFees = unit.fees.filter(fee => {
            const feeDueDateParts = fee.dueDate.split('/');
            const feeDueDate = new Date(`${feeDueDateParts[2]}-${feeDueDateParts[1]}-${feeDueDateParts[0]}`);
            return feeDueDate >= start && feeDueDate <= end;
          });
          // Retorna uma cópia da unidade com as taxas filtradas
          return { ...unit, fees: filteredFees };
        }).filter(unit => unit.fees.length > 0); // Só mostra unidades que têm taxas no período
      } else {
        // Filtra as taxas do morador
        $scope.displayedData = allDataForView.filter(fee => {
          const feeDueDateParts = fee.dueDate.split('/');
          const feeDueDate = new Date(`${feeDueDateParts[2]}-${feeDueDateParts[1]}-${feeDueDateParts[0]}`);
          return feeDueDate >= start && feeDueDate <= end;
        });
      }
    };
    
    // --- Funções dos Modais (Completas) ---
    $scope.openFeeDetailsModal = function(fee) {
        $scope.modals.feeDetail.data = fee;
        $scope.modals.feeDetail.isOpen = true;
        $timeout(lucide.createIcons, 0);
    };
    $scope.openNewFeeModal = function() {
        $scope.modals.newFee.isOpen = true;
        $timeout(lucide.createIcons, 0);
    };
    $scope.closeAllModals = function() {
      $scope.modals.feeDetail.isOpen = false;
      $scope.modals.newFee.isOpen = false;
    };

    // --- Funções de Ação (Completas) ---
    $scope.generatePdf = function(fee) {
      PdfService.generateFeeReceipt(fee);
    };
    $scope.launchNewFee = function() {
        alert("Nova taxa lançada com sucesso! (Simulação)");
        $scope.closeAllModals();
    };
  });