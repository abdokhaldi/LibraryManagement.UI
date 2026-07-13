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

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <LoanTableHeader />
        <tbody className="divide-y divide-slate-100">
          {loans.length === 0 ? (
            <tr>
              <td
                colSpan={100}
                className="text-center py-12 text-slate-500 italic"
              >
                No loans found.
              </td>
            </tr>
          ) : (
            loans.map((loan) => (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}