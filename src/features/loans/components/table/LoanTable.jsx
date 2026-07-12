import { useRef } from 'react';
import { LoanTableHeader } from "./LoanTableHeader";
import { LoanTableRow } from "./LoanTableRow";

export function LoanTable({
  loans,
  showActions,
  setShowActions,
  onReturnBook,
  onOpenExtendModal,
  onViewFines,
}) {
  const actionRef = useRef(null);

  if (loans.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
        <p className="text-slate-500 italic">No loans found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <LoanTableHeader />
        <tbody className="divide-y divide-slate-100">
          {loans.map((loan) => (
            <LoanTableRow
              key={loan.borrowingID}
              loan={loan}
              showActions={showActions}
              setShowActions={setShowActions}
              onReturnBook={onReturnBook}
              onOpenExtendModal={onOpenExtendModal}
              onViewFines={onViewFines}
              actionRef={actionRef}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}