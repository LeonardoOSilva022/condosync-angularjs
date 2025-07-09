angular
  .module("meuApp")
  .factory("DataService", function () {
    
    const service = {};

    // --- FONTE DA VERDADE (com dados consistentes) ---
    let units = [
        { id: 101, apt: "101", owner: "Ana Silva", status: "Ocupado" },
        { id: 102, apt: "102", owner: "Roberto Santos", status: "Ocupado" },
        { id: 201, apt: "201", owner: "Fernanda Costa", status: "Alugado" },
        { id: 203, apt: "203", owner: "Fernanda Montenegro", status: "Alugado" }
        // ... (outras unidades para completar 20 no total se necessário)
    ];

    let residents = [
        { id: 1, name: "Ana Silva", unit: "101", phone: "(11) 99123-4567", email: "ana.silva@email.com", status: "Proprietário", statusClass: "bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20" },
        { id: 2, name: "Maria Souza", unit: "101", phone: "(11) 98765-4321", email: "maria.souza@email.com", status: "Inquilino", statusClass: "bg-yellow-100 text-yellow-700 ring-1 ring-inset ring-yellow-600/20" },
        { id: 3, name: "Roberto Santos", unit: "102", phone: "(11) 98765-1111", email: "roberto.santos@email.com", status: "Proprietário", statusClass: "bg-green-100 text-green-700 ring-1 ring-inset ring-green-600/20" },
        // ... (outros moradores para completar 32 no total)
    ];
    
    let fees = [
        { id: "fee-101-1", unitId: 101, description: "Taxa Condominial - Maio/2025", amount: 350.00, dueDate: "10/05/2025", status: "Pago", statusClass: "bg-green-100 text-green-800", paymentDate: "05/05/2025", details: [{ name: "Condomínio", value: 350.00 }] },
        { id: "fee-101-2", unitId: 101, description: "Taxa Condominial - Junho/2025", amount: 350.00, dueDate: "10/06/2025", status: "Pendente", statusClass: "bg-yellow-100 text-yellow-800" },
        { id: "fee-201-1", unitId: 201, description: "Taxa Condominial - Junho/2025", amount: 350.00, dueDate: "10/06/2025", status: "Atrasado", statusClass: "bg-red-100 text-red-800" },
        { id: "fee-203-1", unitId: 203, description: "Taxa Condominial - Junho/2025", amount: 350.00, dueDate: "10/06/2025", status: "Atrasado", statusClass: "bg-red-100 text-red-800" },
        { id: "fee-102-1", unitId: 102, description: "Taxa Condominial - Maio/2025", amount: 350.00, dueDate: "10/05/2025", status: "Pago", statusClass: "bg-green-100 text-green-800", paymentDate: "05/05/2025", details: [{ name: "Taxa de limpeza", value: 100.00 }] },
    ];

    // ===== FUNÇÕES GETTER COMPLETAS E CORRIGIDAS =====
    
    // Unidades
    service.getUnits = function() { return units; };
    service.getOccupiedUnitsCount = function() {
        return units.filter(u => u.status === 'Ocupado' || u.status === 'Alugado').length;
    };
    
    // Moradores
    service.getResidents = function() { return residents; };
    
    // Taxas
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
    service.getFeesByUnitId = function(unitId) {
      return fees.filter(fee => fee.unitId == unitId);
    };
    service.getUnitsWithFees = function() {
        return units.map(unit => {
            const unitFees = fees.filter(fee => fee.unitId === unit.id);
            return { ...unit, fees: unitFees };
        });
    };
    
    return service;
  });