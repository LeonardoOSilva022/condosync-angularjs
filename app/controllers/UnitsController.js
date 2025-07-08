angular
  .module("meuApp")
  .controller("UnitsController", function ($scope, $timeout, $state, AuthService) {
    const currentUser = AuthService.currentUser() || {};
    if (!currentUser || currentUser.role !== 'manager') {
        $state.go('app.dashboard'); 
        return; 
    }
    $scope.newUnit = { apt: '', status: 'Vago', owner: '', adults: 0, children: 0 };
    $scope.modals = { addUnit: { isOpen: false }, viewUnit: { isOpen: false, data: null } };

    $scope.units = [
        { id: "unit-1", apt: "101", owner: "Ana Silva", status: "Ocupado", statusClass: "bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20", residents: "2 adultos, 1 criança" },
        { id: "unit-2", apt: "102", owner: "Roberto Santos", status: "Ocupado", statusClass: "bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20", residents: "1 adulto" },
        { id: "unit-3", apt: "201", owner: "Fernanda Costa", status: "Alugado", statusClass: "bg-yellow-100 text-yellow-700 ring-1 ring-inset ring-yellow-600/20", residents: "2 adultos" },
        { id: "unit-4", apt: "202", owner: "Marcos Oliveira", status: "Ocupado", statusClass: "bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20", residents: "3 adultos" },
        { id: "unit-5", apt: "203", owner: "Carlos Lima", status: "Ocupado", statusClass: "bg-green-100 text-green-800 ring-1 ring-inset ring-green-600/20", residents: "2 adultos, 2 crianças" },
        { id: "unit-6", apt: "301", owner: "Juliana Castro", status: "Vago", statusClass: "bg-red-100 text-red-700 ring-1 ring-inset ring-red-600/20", residents: "-" }
    ];

    $scope.openAddUnitModal = function() { $scope.newUnit = { apt: '', status: 'Vago', owner: '', adults: 0, children: 0 }; $scope.modals.addUnit.isOpen = true; $timeout(lucide.createIcons, 0); };
    $scope.openViewUnitModal = function(unit) { $scope.modals.viewUnit.data = unit; $scope.modals.viewUnit.isOpen = true; $timeout(lucide.createIcons, 0); };
    $scope.closeAllModals = function() { $scope.modals.addUnit.isOpen = false; $scope.modals.viewUnit.isOpen = false; $scope.modals.viewUnit.data = null; };
    $scope.addNewUnit = function() {
      let residentsString = "-";
      if ($scope.newUnit.adults > 0 || $scope.newUnit.children > 0) {
        let parts = [];
        if ($scope.newUnit.adults > 0) parts.push($scope.newUnit.adults + ($scope.newUnit.adults > 1 ? ' adultos' : ' adulto'));
        if ($scope.newUnit.children > 0) parts.push($scope.newUnit.children + ($scope.newUnit.children > 1 ? ' crianças' : ' criança'));
        residentsString = parts.join(', ');
      }
      let statusClass = "bg-gray-100 text-gray-800";
      if ($scope.newUnit.status === 'Ocupado') statusClass = "bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20";
      else if ($scope.newUnit.status === 'Alugado') statusClass = "bg-yellow-100 text-yellow-700 ring-1 ring-inset ring-yellow-600/20";
      else if ($scope.newUnit.status === 'Vago') statusClass = "bg-red-100 text-red-700 ring-1 ring-inset ring-red-600/20";
      const newUnitData = { id: "unit-" + ($scope.units.length + 1), apt: $scope.newUnit.apt, owner: $scope.newUnit.owner || "-", status: $scope.newUnit.status, statusClass: statusClass, residents: residentsString };
      $scope.units.push(newUnitData);
      alert("Unidade " + newUnitData.apt + " adicionada com sucesso! (Simulação)");
      $scope.closeAllModals();
    };
  });