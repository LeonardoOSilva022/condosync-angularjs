angular
  .module("meuApp")
  .controller("ReservationsController", function ($scope, $timeout, AuthService) {
    
    // --- Lógica de Inicialização ---
    $scope.view = { tab: 'upcoming' };
    $scope.modal = { isOpen: false };
    
    const currentUser = AuthService.currentUser() || {};
    $scope.user = currentUser;
    $scope.isManager = currentUser.role === 'manager';

    // --- Dados Simulados ---
    $scope.availableAreas = [
      { id: "1", name: "Salão de Festas" },
      { id: "2", name: "Churrasqueira" },
      { id: "3", name: "Espaço Gourmet" },
    ];
    $scope.upcomingReservations = [
      { areaName: "Salão de Festas", residentName: $scope.isManager ? "Ana Silva (Apto 101)" : "Você", date: "25/05/2025", time: "18:00 - 23:00", reason: "Aniversário", status: "Confirmado", statusClass: "bg-green-100 text-green-800" }
    ];
    $scope.historyReservations = [
      { areaName: "Churrasqueira", residentName: $scope.isManager ? "Carlos Lima (Apto 203)" : "Você", date: "01/05/2025", time: "12:00 - 18:00", reason: "Almoço em família", status: "Concluído", statusClass: "bg-gray-100 text-gray-800" }
    ];
    $scope.pendingReservations = [
        { areaName: "Salão de Festas", residentName: "Marcos Oliveira (Apto 304)", date: "15/06/2025", time: "19:00 - 23:00", reason: "Reunião familiar", status: "Aguardando", statusClass: "bg-yellow-100 text-yellow-800" }
    ];

    // ===== FUNÇÕES DO MODAL (RESTAURADAS) =====
    $scope.openNewReservationModal = function() {
      $scope.modal.isOpen = true;
      $timeout(function() {
          lucide.createIcons();
      }, 0);
    };

    $scope.closeNewReservationModal = function() {
      $scope.modal.isOpen = false;
    };

    $scope.createReservation = function() {
      // Simula o envio do formulário
      alert("Reserva solicitada com sucesso!\n(Esta é uma simulação)");
      $scope.closeNewReservationModal();
    };

    // ===== FUNÇÕES DO SÍNDICO (JÁ EXISTENTES) =====
    $scope.approveReservation = function(reservationToApprove) {
      reservationToApprove.status = "Confirmado";
      reservationToApprove.statusClass = "bg-green-100 text-green-800";
      $scope.upcomingReservations.push(reservationToApprove);
      $scope.pendingReservations = $scope.pendingReservations.filter(res => res !== reservationToApprove);
      alert("Reserva APROVADA com sucesso!");
    };
    
    $scope.declineReservation = function(reservationToDecline) {
      $scope.pendingReservations = $scope.pendingReservations.filter(res => res !== reservationToDecline);
      alert("Reserva RECUSADA.");
    };

  });