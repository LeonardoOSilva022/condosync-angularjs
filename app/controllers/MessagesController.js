angular
  .module("meuApp")
  .controller("MessagesController", function ($scope, $timeout, AuthService) {
    
    const currentUser = AuthService.currentUser() || {};
    $scope.user = currentUser;
    $scope.isManager = currentUser.role === 'manager';

    // Modal de Nova Mensagem
    $scope.newMessageModal = {
      isOpen: false
    };

    // ===== NOVO: Modal de Resposta =====
    $scope.replyModal = {
      isOpen: false,
      originalMessage: null // Para guardar a mensagem que está sendo respondida
    };

    // Dados simulados
    $scope.recipients = [ /* ... dados dos destinatários ... */ ];
    $scope.messages = [ /* ... dados das mensagens ... */ ];

    // Funções do modal de NOVA MENSAGEM
    $scope.openNewMessageModal = function() {
      $scope.newMessageModal.isOpen = true;
      $timeout(function() { lucide.createIcons(); }, 0);
    };
    $scope.closeNewMessageModal = function() {
      $scope.newMessageModal.isOpen = false;
    };
    $scope.sendMessage = function() {
      alert("Nova mensagem enviada com sucesso! (Simulação)");
      $scope.closeNewMessageModal();
    };

    // ===== NOVAS FUNÇÕES PARA O MODAL DE RESPOSTA =====
    $scope.openReplyModal = function(message) {
      $scope.replyModal.originalMessage = message;
      $scope.replyModal.isOpen = true;
      $timeout(function() { lucide.createIcons(); }, 0);
    };

    $scope.closeReplyModal = function() {
      $scope.replyModal.isOpen = false;
      $scope.replyModal.originalMessage = null;
    };

    $scope.sendReply = function() {
      // Em um app real, você pegaria o texto da resposta e enviaria ao backend
      alert("Resposta enviada com sucesso! (Simulação)");
      $scope.closeReplyModal();
    };

    // Preenchendo os dados para evitar erros
    $scope.recipients = [
        { id: "1", name: "Ana Silva", unit: "101" },
        { id: "2", name: "Carlos Lima", unit: "203" },
    ];
    $scope.messages = [
        { from: $scope.isManager ? "Ana Silva (Apto 101)" : "Síndico", date: "15/05/2025 às 14:30", content: $scope.isManager ? "Olá, gostaria de saber se a manutenção do elevador foi agendada. Obrigada!" : "Olá, gostaria de informar que a manutenção do elevador será realizada na próxima terça-feira." },
        { from: $scope.isManager ? "Carlos Lima (Apto 203)" : "Síndico", date: "10/05/2025 às 09:15", content: $scope.isManager ? "Bom dia! Poderia me informar se há alguma restrição para visitantes usarem a churrasqueira?" : "Prezado morador, lembro que as taxas de condomínio vencem na próxima segunda-feira." }
    ];
  });