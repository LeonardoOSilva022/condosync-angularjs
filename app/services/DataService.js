angular
  .module("meuApp")
  .factory("DataService", function () {
    
    const service = {};

    // --- FONTE DA VERDADE PARA OS DADOS ---
    let units = [
        { id: 1, apt: "101", owner: "Ana Silva", status: "Ocupado" },
        { id: 2, apt: "102", owner: "Roberto Santos", status: "Ocupado" },
        { id: 3, apt: "201", owner: "Fernanda Costa", status: "Alugado" },
        { id: 4, apt: "202", owner: "Marcos Oliveira", status: "Ocupado" },
        { id: 5, apt: "203", owner: "Carlos Lima", status: "Ocupado" },
        { id: 6, apt: "301", owner: "Juliana Castro", status: "Vago" }
    ];

    let residents = [];
    for (let i = 1; i <= 32; i++) {
      residents.push({ id: i, name: `Morador ${i}`, unit: `${100 + i}`, phone: `(11) 90000-00${i}`, email: `morador${i}@email.com`, status: "Inquilino", statusClass: "bg-yellow-100 text-yellow-800" });
    }

    let fees = [
        { id: "fee-101-1", unitId: 1, description: "Taxa Condominial - Maio/2025", amount: 350.00, dueDate: "10/05/2025", status: "Pago" },
        { id: "fee-101-2", unitId: 1, description: "Taxa Condominial - Junho/2025", amount: 350.00, dueDate: "10/06/2025", status: "Pendente" },
        { id: "fee-102-1", unitId: 2, description: "Taxa Condominial - Junho/2025", amount: 350.00, dueDate: "10/06/2025", status: "Atrasado" },
        { id: "fee-102-2", unitId: 2, description: "Multa por barulho", amount: 150.00, dueDate: "20/06/2025", status: "Pendente" },
        { id: "fee-202-1", unitId: 4, description: "Taxa Condominial - Junho/2025", amount: 350.00, dueDate: "10/06/2025", status: "Atrasado" },
    ];
    
    // --- FUNÇÕES "GETTER" PARA OS CONTROLLERS ---
    
    service.getUnits = function() { return units; };
    service.getOccupiedUnitsCount = function() {
        return units.filter(u => u.status === 'Ocupado' || u.status === 'Alugado').length;
    };
    
    service.getResidents = function() { return residents; };
    
    service.getFees = function() { return fees; };
    service.getPendingFees = function() {
        return fees.filter(f => f.status === 'Pendente' || f.status === 'Atrasado');
    };
    service.getTotalPendingAmount = function() {
        return service.getPendingFees().reduce((sum, fee) => sum + fee.amount, 0);
    };
    service.getUnitsWithOverdueFees = function() {
        const unitIdsWithOverdue = new Set();
        fees.filter(f => f.status === 'Atrasado').forEach(f => unitIdsWithOverdue.add(f.unitId));
        return unitIdsWithOverdue.size;
    };

    // ===== AQUI ESTÁ A CORREÇÃO CRUCIAL =====
    // Função que combina os dados de unidades e taxas, que estava faltando.
    service.getUnitsWithFees = function() {
      return units.map(unit => {
        const unitFees = fees.filter(fee => fee.unitId === unit.id);
        return { ...unit, fees: unitFees };
      });
    };
    
    return service;
  });