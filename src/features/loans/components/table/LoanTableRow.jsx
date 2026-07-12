import { FaEllipsisV, FaCalendarAlt, FaInfoCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useRef, useEffect } from 'react';
import { formatDate, getStatusStyle } from "../../utils/loanHelpers";
import { LoanStatusBadge } from "../badges/LoanStatusBadge";

export function LoanTableRow({
  loan,
  showActions,
  setShowActions,
  onReturnBook,
  onOpenExtendModal,
  onViewFines,
  actionRef,
}) {
  // Handle outside click to close dropdown
  useEffect(() => {
    if (!showActions) return;
    const handleOutsideClick = (e) => {
      if (actionRef.current && !actionRef.current.contains(e.target)) {
        setShowActions(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showActions]);

  const isActive = showActions === loan.borrowingID;

  return (
    <tr key={loan.borrowingID} className="hover:bg-slate-50/80 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="font-bold text-slate-800 text-sm">{loan.title}</span>
          <span className="text-xs text-slate-400 font-mono mt-1">#{loan.barcode}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm text-slate-600 font-medium">{loan.fullName}</span>
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-col items-center gap-1 text-[11px] font-semibold">
          <span className="text-blue-600 bg-blue-50 px-2 rounded-md">
            In: {formatDate(loan.borrowingDate)}
          </span>
          <span className="text-amber-600 bg-amber-50 px-2 rounded-md">
            Due: {formatDate(loan.dueDate)}
          </span>
          {loan.returnDate && (
            <span className="text-green-600 bg-green-50 px-2 rounded-md">
              Out: {formatDate(loan.returnDate)}
            </span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400">Fees: ${loan.initialFees}</span>
          <span className="text-sm font-bold text-red-500">Fine: ${loan.currentFine}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <LoanStatusBadge status={loan.status} />
      </td>
      <td className="px-6 py-4 text-right relative">
        <div className="flex justify-end items-center gap-2">
          {loan.status !== "Returned" && (
            <button
              onClick={() => onReturnBook(loan.borrowingID)}
              className="text-xs bg-slate-800 hover:bg-black text-white px-3 py-1.5 rounded-lg transition-all"
            >
              Return
            </button>
          )}
          <button
            onClick={() => setShowActions(isActive ? null : loan.borrowingID)}
            className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-all"
          >
            <FaEllipsisV />
          </button>
        </div>

        {/* Dropdown Menu */}
        {isActive && (
          <div ref={actionRef} className="absolute right-6 top-12 w-48 bg-white shadow-xl border border-slate-100 rounded-xl z-50 py-2 animate-in zoom-in-95 duration-100">
            {loan.status !== "Returned" && (
              <button
                onClick={() => onOpenExtendModal(loan)}
                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-slate-50 text-sm text-slate-600"
              >
                <FaCalendarAlt className="text-blue-500" /> Extend Date
              </button>
            )}

            {loan.status === "Returned" && (
              <button
                onClick={() => onViewFines(loan.borrowingID)}
                className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-slate-50 text-sm text-slate-600"
              >
                <FaInfoCircle className="text-amber-500" /> View Fines
              </button>
            )}

            <div className="h-px bg-slate-100 my-1"></div>

            {loan.status === "Overdue" && (
              <button className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-500 font-semibold">
                ⚠️ Mark as Lost
              </button>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}