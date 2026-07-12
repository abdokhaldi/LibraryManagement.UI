import { useState, useEffect } from 'react';

export function LoanFilters({ isOpen, filters, setFilters }) {
  return (
    isOpen && (
      <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center gap-4 animate-in slide-in-from-top duration-300">
        <span className="text-sm font-bold text-slate-600">Filter by Status:</span>
        <select
          onChange={(e) => setFilters(e.target.value)}
          value={filters}
          className="bg-white border border-slate-200 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 shadow-sm outline-none"
        >
          <option value="all">All Records</option>
          <option value="returned">Returned Only</option>
          <option value="overdue">Overdue Items</option>
          <option value="borrowed">Currently Borrowed</option>
        </select>
      </div>
    )
  );
}