angular
  .module("meuApp")
  .controller("ComplaintsController", function ($scope, $timeout, AuthService) {
    
    // --- Inicialização ---
    const currentUser = AuthService.currentUser() || {};
    $scope.user = currentUser;
    $scope.isManager = currentUser.role === 'manager';
    
    $scope.view = { tab: 'open' }; // Aba inicial
    
    // Modais
    $scope.newComplaintModal = { isOpen: false };
    $scope.viewComplaintModal = { isOpen: false, data: null };
    $scope.respondModal = { isOpen: false, data: null, responseText: "" };

    // --- Dados Simulados ---
    $scope.complaints = [
        { id: "1", title: "Infiltração na parede", description: "Estou com uma infiltração na parede da sala que está piorando. Parece vir do apartamento de cima.", unitNumber: "203", residentName: "Carlos Silva", createdAt: "10/05/2025", status: "pending" },
        { id: "2", title: "Barulho excessivo", description: "Reclamação sobre barulho excessivo do apartamento vizinho após as 22h, principalmente nos finais de semana.", unitNumber: "101", residentName: "Ana Pereira", createdAt: "12/05/2025", status: "pending" },
        { id: "3", title: "Lâmpada queimada na garagem", description: "A lâmpada da vaga 10 está queimada há uma semana.", unitNumber: "304", residentName: "Pedro Souza", createdAt: "01/05/2025", status: "resolved", response: "A lâmpada foi substituída pelo zelador no dia 05/05.", responseDate: "05/05/2025" }
    ];

    $scope.openComplaints = $scope.complaints.filter(c => c.status !== 'resolved');
    $scope.solvedComplaints = $scope.complaints.filter(c => c.status === 'resolved');

    // --- Funções dos Modais ---
    $scope.openNewComplaintModal = function() {
      $scope.newComplaintModal.isOpen = true;
      $timeout(lucide.createIcons, 0);
    };
    $scope.openViewComplaintModal = function(complaint) {
      $scope.viewComplaintModal.data = complaint;
      $scope.viewComplaintModal.isOpen = true;
      $timeout(lucide.createIcons, 0);
    };
    $scope.openRespondModal = function(complaint) {
        $scope.respondModal.data = complaint;
        $scope.respondModal.isOpen = true;
        $timeout(lucide.createIcons, 0);
    };

    $scope.closeAllModals = function() {
        $scope.newComplaintModal.isOpen = false;
        $scope.viewComplaintModal.isOpen = false;
        $scope.respondModal.isOpen = false;
    };
    
    // --- Funções de Ação ---
    $scope.submitNewComplaint = function() {
        alert("Nova reclamação registrada com sucesso! (Simulação)");
        $scope.closeAllModals();
    };

    $scope.markAsResolved = function() {
        var complaintId = $scope.respondModal.data.id;
        // Lógica para encontrar e atualizar a reclamação
        var complaint = $scope.complaints.find(c => c.id === complaintId);
        if (complaint) {
            complaint.status = 'resolved';
            complaint.response = $scope.respondModal.responseText || "Resolvido pelo síndico.";
            complaint.responseDate = new Date().toLocaleDateString();
            
            // Atualiza as listas
            $scope.openComplaints = $scope.complaints.filter(c => c.status !== 'resolved');
            $scope.solvedComplaints = $scope.complaints.filter(c => c.status === 'resolved');
        }
        alert("Reclamação marcada como resolvida!");
        $scope.closeAllModals();
    };

  });