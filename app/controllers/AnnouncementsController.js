angular
  .module("meuApp")
  .controller("AnnouncementsController", function ($scope, AuthService) {
    $scope.user = AuthService.currentUser();

    // Dados simulados (Mock Data) dos avisos
    $scope.announcements = [
      {
        title: "Limpeza da Caixa D'água",
        date: "15/05/2025",
        content:
          "Informamos que será realizada a limpeza da caixa d'água do condomínio no próximo sábado, dia 24/05/2025, entre 8h e 15h. Durante esse período, o fornecimento de água será interrompido. Solicitamos que todos os moradores providenciem reserva de água para suas necessidades durante esse intervalo.",
      },
      {
        title: "Manutenção do Portão da Garagem",
        date: "10/05/2025",
        content:
          "Informamos que na próxima segunda-feira, dia 19/05/2025, será realizada a manutenção do portão da garagem. O serviço está previsto para ocorrer entre 13h e 17h. Durante esse período, o acesso de veículos estará temporariamente indisponível.",
      },
      {
        title: "Reunião de Condomínio",
        date: "05/05/2025",
        content:
          "Convocamos todos os condôminos para reunião ordinária a ser realizada no dia 30/05/2025, às 19h30, no salão de festas do condomínio. Pauta: prestação de contas, discussão sobre a reforma da piscina e assuntos gerais. Sua presença é fundamental.",
      },
    ];
  });
