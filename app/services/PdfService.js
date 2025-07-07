angular.module('meuApp').factory('PdfService', ['$window', function($window) {
    return {
        generateFeeReceipt: function(fee) {
            if (!fee || fee.status !== 'Pago') {
                alert("Recibos estão disponíveis apenas para taxas pagas.");
                return;
            }

            try {
                const { jsPDF } = $window.jspdf;
                const doc = new jsPDF();

                let y = 20; // Posição vertical inicial

                // Cabeçalho Principal
                doc.setFontSize(24);
                doc.setFont(undefined, 'bold');
                doc.text("CondoSync", 105, y, { align: 'center' });
                y += 8;
                doc.setFontSize(14);
                doc.setFont(undefined, 'normal');
                doc.text("Recibo de Pagamento", 105, y, { align: 'center' });
                y += 5;
                doc.setFontSize(10);
                doc.text(`Recibo Nº: ${fee.id}`, 190, y, { align: 'right' });
                y += 10;

                // Linha separadora
                doc.line(20, y, 190, y);
                y += 12;

                // Seção de Informações da Taxa
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text("Informações da Taxa", 20, y);
                y += 8;
                
                doc.setFont(undefined, 'normal');
                doc.setFontSize(10);
                doc.text(`Descrição: ${fee.description}`, 25, y);
                y += 7;
                doc.text(`Valor: R$ ${fee.amount.toFixed(2)}`, 25, y);
                y += 7;
                doc.text(`Data de Vencimento: ${fee.dueDate}`, 25, y);
                y += 7;
                doc.text(`Data de Pagamento: ${fee.paymentDate}`, 25, y);
                y += 7;
                doc.text(`Método de Pagamento: ${fee.paymentMethod}`, 25, y);
                y += 15;

                // Seção de Detalhamento
                doc.setFontSize(12);
                doc.setFont(undefined, 'bold');
                doc.text("Detalhamento", 20, y);
                y += 8;

                // Tabela de Detalhamento
                let tableTop = y;
                doc.line(20, tableTop, 190, tableTop); // Linha do topo da tabela
                doc.setFont(undefined, 'bold');
                doc.text("Item", 22, tableTop + 5);
                doc.text("Valor (R$)", 188, tableTop + 5, { align: 'right' });
                doc.line(20, tableTop + 8, 190, tableTop + 8);
                
                y = tableTop + 13;
                doc.setFont(undefined, 'normal');
                
                if (fee.details && fee.details.length > 0) {
                    fee.details.forEach(function(detail) {
                        doc.text(detail.name, 22, y);
                        doc.text(detail.value.toFixed(2), 188, y, { align: 'right' });
                        y += 7;
                    });
                }
                
                doc.line(20, y - 4, 190, y - 4);
                doc.setFont(undefined, 'bold');
                doc.text("Total", 22, y);
                doc.text(`R$ ${fee.amount.toFixed(2)}`, 188, y, { align: 'right' });
                y += 2;
                doc.line(20, y, 190, y); // Linha do final da tabela
                

                // Rodapé
                y = 280;
                doc.line(20, y, 190, y);
                y += 5;
                doc.setFontSize(8);
                doc.setFont(undefined, 'normal');
                doc.text(`Este documento é um recibo digital gerado automaticamente pelo sistema CondoSync.`, 105, y, { align: 'center' });
                y += 4;
                doc.text(`Emitido em: ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}`, 105, y, { align: 'center' });

                // Salva o arquivo
                doc.save(`recibo-${fee.id}.pdf`);
            } catch (e) {
                console.error("ERRO CRÍTICO AO GERAR PDF:", e);
                alert("Ocorreu um erro ao gerar o PDF. A biblioteca jsPDF pode não ter sido carregada. Verifique o console (F12).");
            }
        }
    };
}]);