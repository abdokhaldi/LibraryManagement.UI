import { MdPeopleAlt } from "react-icons/md";
import Pagination from "../../../Pagination/Pagination.jsx";
import { UserTableHeader } from "./UserTableHeader.jsx";
import { UserTableRow } from "./UserTableRow.jsx";

export function UserTable({
  users,
  sortConfig,
  onSort,
  selectedUsers,
  onSelectUser,
  onSelectAll,
  hasActiveFilters,
  onResetFilters,
  emptyMessages,
  rowActionHandlers,
  currentPage,
  totalPages,
  onPageChange,
}) {
  const allSelected = users.length > 0 && selectedUsers.size === users.length;

  return (
    <div className="overflow-hidden rounded-b-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <UserTableHeader
            sortConfig={sortConfig}
            onSort={onSort}
            onSelectAll={onSelectAll}
            allSelected={allSelected}
          />
          <tbody className="divide-y divide-gray-50">
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-16 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <MdPeopleAlt className="h-10 w-10 text-gray-300" />
                    <p className="text-sm font-medium text-gray-500">
                      {emptyMessages?.noUsers ?? "No users found"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {emptyMessages?.tryAdjusting ??
                        "Try adjusting your search or filter criteria"}
                    </p>
                    {hasActiveFilters && (
                      <button
                        onClick={onResetFilters}
                        className="mt-2 text-xs font-medium text-green-600 hover:text-green-700 transition"
                      >
                        Clear all filters
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <UserTableRow
                  key={user.userID}
                  user={user}
                  isSelected={selectedUsers.has(user.userID)}
                  onSelect={onSelectUser}
                  onEdit={rowActionHandlers.onEdit}
                  onToggleActive={rowActionHandlers.onToggleActive}
                  onToggleBlocked={rowActionHandlers.onToggleBlocked}
                  onView={rowActionHandlers.onView}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {users.length > 0 && (
        <Pagination
          onNext={() => onPageChange(currentPage + 1)}
          onPrev={() => onPageChange(currentPage - 1)}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}