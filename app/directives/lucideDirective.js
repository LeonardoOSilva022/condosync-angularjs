angular.module('meuApp').directive('renderLucideIcons', function($timeout) {
  return {
    restrict: 'A', // A diretiva será usada como um atributo
    link: function(scope, element, attrs) {
      // Usa um $timeout com 0 de delay. Isso garante que este código
      // rode DEPOIS que o AngularJS terminar de renderizar a view.
      $timeout(function() {
        lucide.createIcons();
      }, 0);
    }
  };
});