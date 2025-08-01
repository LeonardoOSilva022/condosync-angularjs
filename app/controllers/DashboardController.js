angular
  .module("meuApp")
  .controller("DashboardController", function ($scope, $timeout, AuthService) {
    
    // --- Inicialização Segura ---
    const currentUser = AuthService.currentUser() || {};
    $scope.user = currentUser;
    $scope.isManager = currentUser.role === 'manager';

    // --- Objeto para Controlar TODOS os Modais ---
    $scope.modals = {
      newComplaint: { isOpen: false },
      commonAreas: { isOpen: false },
      areaDetail: { isOpen: false, data: null }
    };

    // --- Dados Simulados COMPLETOS para o Síndico (com cálculos) ---
    $scope.managerData = {
      stats: {
        units: 20,
        occupiedUnits: 18,
        residents: 32,
        pendingFees: 5,
        totalFees: 12500,
        pendingReservations: 3
      },
      getOccupancyRate: function() {
        if (!this.stats.units) return 0;
        return ((this.stats.occupiedUnits / this.stats.units) * 100).toFixed(0);
      },
      getDelinquencyRate: function() {
        if (!this.stats.units) return 0;
        return ((this.stats.pendingFees / this.stats.units) * 100).toFixed(0);
      },
      recentAnnouncements: [
        { title: "Reunião de Condomínio", date: "15/05/2025" },
        { title: "Manutenção do Elevador", date: "20/05/2025" }
      ],
      recentComplaints: [
        { title: "Vazamento no Teto", unit: "202", date: "18/05/2025", status: "Pendente", statusClass: "bg-destructive/20 text-destructive" },
        { title: "Barulho após 22h", unit: "101", date: "17/05/2025", status: "Pendente", statusClass: "bg-destructive/20 text-destructive" }
      ]
    };

    // --- Dados Simulados COMPLETOS para o Morador ---
    $scope.residentData = {
        stats: { pendingFees: 2, totalPendingAmount: 560, upcomingReservations: 1 },
        recentAnnouncements: [
            { title: "Reunião de Condomínio", date: "15/05/2025" },
            { title: "Manutenção do Elevador", date: "20/05/2025" }
        ],
        pendingTaxes: [
            { description: "Taxa Condominial - Maio/2025", dueDate: "10/05/2025", amount: 350.00 },
            { description: "Taxa Extra - Pintura Fachada", dueDate: "15/05/2025", amount: 210.00 }
        ],
        upcomingReservationsList: [
            { area: "Salão de Festas", date: "28/05/2025", time: "18:00 - 22:00", status: "Aguardando", statusClass: "bg-yellow-100 text-yellow-800" }
        ],
        commonAreas: [
            { id: 1, name: "Salão de Festas", available: true, image: "https://placehold.co/300x200/e2e8f0/1e293b?text=Sal%C3%A3o+de+Festas", description: "Capacidade para 50 pessoas." },
            { id: 2, name: "Piscina", available: true, image: "https://placehold.co/300x200/e2e8f0/1e293b?text=Piscina", description: "Adulto e infantil." },
        ]
    };
    
    // --- Funções de Controle dos Modais ---
    const openModal = (modalName, data = null) => { $scope.modals[modalName].isOpen = true; if (data) $scope.modals[modalName].data = data; $timeout(lucide.createIcons, 0); };
    const closeModal = (modalName) => { $scope.modals[modalName].isOpen = false; if ($scope.modals[modalName]) $scope.modals[modalName].data = null; };
    $scope.openNewComplaintModal = () => openModal('newComplaint');
    $scope.closeNewComplaintModal = () => closeModal('newComplaint');
    $scope.openCommonAreasModal = () => openModal('commonAreas');
    $scope.closeCommonAreasModal = () => closeModal('commonAreas');
    $scope.openAreaDetail = (area) => { openModal('areaDetail', area); };
    $scope.closeAreaDetail = () => closeModal('areaDetail');
    
    $scope.submitComplaint = () => { alert("Nova reclamação registrada! (Simulação)"); $scope.closeNewComplaintModal(); };
  });