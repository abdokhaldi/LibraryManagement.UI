import { MemberTableHeader } from "./MemberTableHeader.jsx";
import { MemberTableRow } from "./MemberTableRow.jsx";
import { MemberDetailModal } from "../modals/MemberDetailModal.jsx";
import Pagination from "../../../Pagination/Pagination.jsx";

export function MemberTable({
  members,
  sortConfig,
  onSort,
  selectedMembers,
  onSelectMember,
  onSelectAll,
  onViewDetails,
  actionMenuOpen,
  setActionMenuOpen,
  detailModal,
  onCloseDetailModal,
  onTableClick,
  currentPage,
  totalPages,
  onPageChange,
  loading,
  emptyMessage = "No members found",
}) {
  if (loading) {
    return (
      <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          Loading members from server...
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-b-xl border border-gray-200 bg-white shadow-sm" onClick={onTableClick}>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <MemberTableHeader sortConfig={sortConfig} onSort={onSort} />
          <tbody className="divide-y divide-gray-50">
            {members.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <svg className="h-10 w-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-500">{emptyMessage}</p>
                    <p className="text-xs text-gray-400">Try adjusting your search criteria</p>
                  </div>
                </td>
              </tr>
            ) : (
              members.map((member) => (
                <MemberTableRow
                  key={member.memberID}
                  member={member}
                  isSelected={selectedMembers.has(member.memberID)}
                  onSelect={onSelectMember}
                  onViewDetails={onViewDetails}
                  actionMenuOpen={actionMenuOpen}
                  setActionMenuOpen={setActionMenuOpen}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {members.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100">
          <Pagination
            onNext={() => onPageChange(currentPage + 1)}
            onPrev={() => onPageChange(currentPage - 1)}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}

      <MemberDetailModal
        member={detailModal}
        onClose={onCloseDetailModal}
      />
    </div>
  );
}
