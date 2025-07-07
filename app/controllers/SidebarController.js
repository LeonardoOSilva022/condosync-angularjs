angular
  .module("meuApp")
  .controller("SidebarController", function ($scope, $state, AuthService) {
    
    const currentUser = AuthService.currentUser() || {};
    $scope.user = currentUser;

    if ($scope.user.name) {
        $scope.user.initials = $scope.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().substring(0, 2);
    }
    
    var navigationItems = [
      { name: "Dashboard", state: "app.dashboard", iconName: "home", access: ["manager", "resident"] },
      { name: "Unidades", state: "app.units", iconName: "building", access: ["manager"] },
      { name: "Moradores", state: "app.residents", iconName: "users", access: ["manager"] },
      { name: "Taxas", state: "app.fees", iconName: "dollar-sign", access: ["manager", "resident"] },
      { name: "Avisos", state: "app.announcements", iconName: "bell", access: ["manager", "resident"] },
      { name: "Reservas", state: "app.reservations", iconName: "calendar", access: ["manager", "resident"] },
      { name: "Mensagens", state: "app.messages", iconName: "message-square", access: ["manager", "resident"] },
      { name: "Reclamações", state: "app.complaints", iconName: "file-text", access: ["manager", "resident"] },
      { name: "Configurações", state: "app.settings", iconName: "settings", access: ["manager", "resident"] },
    ];

    if ($scope.user.role) {
      $scope.filteredNavigation = navigationItems.filter(item => item.access.includes($scope.user.role));
    }
    
    $scope.logout = function() {
        AuthService.logout();
        $state.go('login'); 
    };
  });