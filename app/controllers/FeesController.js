angular
  .module("meuApp")
  .controller("FeesController", function ($scope, $timeout, AuthService, PdfService) {
    
    // Objeto para controlar o modal
    $scope.modal = {
      isOpen: false,
      selectedFee: null
    };

    // Pega o usuário e define o perfil
    const currentUser = AuthService.currentUser() || {};
    $scope.isManager = currentUser.role === 'manager';
    $scope.user = currentUser;

    // Dados para a view
    $scope.summary = {
        pendingAmount: $scope.isManager ? "5.400,00" : "500,00",
        paidAmount: $scope.isManager ? "8.600,00" : "350,00",
        pendingDescription: $scope.isManager ? "Total pendente de todos os moradores" : "Total pendente para sua unidade",
        paidDescription: $scope.isManager ? "Total pago este mês" : "Total pago este mês por sua unidade"
    };
    $scope.fees = [
        { 
            id: "fee-1", description: "Taxa de Condomínio - Maio/2025", amount: 350.00, dueDate: "10/05/2025", status: "Pago", statusClass: "bg-green-100 text-green-800 ring-green-600/20",
            paymentDate: "05/05/2025", paymentMethod: "Boleto Bancário",
            details: [ { name: "Taxa de limpeza", value: 100.00 }, { name: "Segurança", value: 80.00 }, { name: "Manutenção geral", value: 120.00 }, { name: "Fundo de reserva", value: 50.00 } ]
        },
        { id: "fee-2", description: "Taxa de Condomínio - Junho/2025", amount: 350.00, dueDate: "10/06/2025", status: "Pendente", statusClass: "bg-yellow-100 text-yellow-800 ring-yellow-600/20", details: []},
        { id: "fee-3", description: "Taxa Extra - Reforma Portaria", amount: 150.00, dueDate: "15/06/2025", status: "Atrasado", statusClass: "bg-red-100 text-red-800 ring-red-600/20", details: []},
    ];
    
    // Funções para o modal
    $scope.openFeeDetailsModal = function(fee) {
        $scope.modal.selectedFee = fee;
        $scope.modal.isOpen = true;
        // Força a renderização dos ícones de dentro do modal
        $timeout(function() {
            lucide.createIcons();
        }, 0);
    };
    $scope.closeFeeDetailsModal = function() {
        $scope.modal.isOpen = false;
        $scope.modal.selectedFee = null;
    };
    
    // Funções de ação
    $scope.generatePdf = function(fee) {
        PdfService.generateFeeReceipt(fee);
    };
    $scope.attachFile = function() {
        alert("Funcionalidade de anexo simulada.");
    };
  });