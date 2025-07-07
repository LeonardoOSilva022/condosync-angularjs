angular
  .module("meuApp")
  .controller("UnitsController", function ($scope, $state, AuthService) {
    
    var currentUser = AuthService.currentUser();
    if (!currentUser || currentUser.role !== 'manager') {
        $state.go('app.dashboard');
        return;
    }

    $scope.units = [
        { apt: "101", owner: "Ana Silva", status: "Ocupado", statusClass: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20", residents: "2 adultos, 1 criança" },
        { apt: "102", owner: "Roberto Santos", status: "Ocupado", statusClass: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20", residents: "1 adulto" },
        { apt: "201", owner: "Fernanda Costa", status: "Alugado", statusClass: "bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20", residents: "2 adultos" },
        { apt: "202", owner: "Marcos Oliveira", status: "Ocupado", statusClass: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20", residents: "3 adultos" },
        { apt: "203", owner: "Carlos Lima", status: "Ocupado", statusClass: "bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20", residents: "2 adultos, 2 crianças" },
        { apt: "301", owner: "Juliana Castro", status: "Vago", statusClass: "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20", residents: "-" }
    ];

  });