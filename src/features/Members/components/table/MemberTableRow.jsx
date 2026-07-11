import { HiOutlineDotsVertical, HiOutlineEye } from "react-icons/hi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { MemberAvatar } from "../common/MemberAvatar.jsx";
import { StatusBadge } from "../badges/StatusBadge.jsx";

export function MemberTableRow({
  member,
  isSelected,
  onSelect,
  onViewDetails,
  actionMenuOpen,
  setActionMenuOpen,
}) {
  const handleRowClick = (e) => {
    // Don't trigger selection if clicking on checkbox or action menu
    if (e.target.type === 'checkbox' || e.target.closest('[data-action-menu]')) {
      return;
    }
    onSelect(member.memberID);
  };

  return (
    <tr
      className={`group transition ${
        isSelected ? "bg-green-50/60" : "hover:bg-gray-50/80"
      }`}
      onClick={handleRowClick}
    >
      {/* Checkbox */}
      <td className="px-4 py-3.5">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onSelect(member.memberID);
          }}
          className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500/20 cursor-pointer"
        />
      </td>

      {/* Member info */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <MemberAvatar member={member} size="md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {member.person?.fullName}
            </p>
            <p className="truncate text-xs text-gray-500">
              {member.person?.email}
            </p>
          </div>
        </div>
      </td>

      {/* Joined */}
      <td className="px-4 py-3.5 text-sm text-gray-500">
        {new Date(member.membershipDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>

      {/* Borrowed */}
      <td className="px-4 py-3.5">
        <span
          className={`inline-flex items-center gap-1 text-sm font-medium ${
            (member.currentlyBorrowedBooks || 0) > 0
              ? "text-green-600"
              : "text-gray-400"
          }`}
        >
          <HiOutlineBookOpen className="h-3.5 w-3.5" />
          {member.currentlyBorrowedBooks ?? 0}
        </span>
      </td>

      {/* Total */}
      <td className="px-4 py-3.5 text-sm text-gray-600">
        {member.totalBorrowedBooks ?? 0}
      </td>

      {/* Status */}
      <td className="px-4 py-3.5">
        <StatusBadge isActive={member.isActive} />
      </td>

      {/* Actions */}
      <td className="px-4 py-3.5 text-right">
        <div className="relative inline-block">
          <button
            data-action-menu
            onClick={(e) => {
              e.stopPropagation();
              setActionMenuOpen(
                actionMenuOpen === member.memberID ? null : member.memberID
              );
            }}
            className="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600 focus:opacity-100"
          >
            <HiOutlineDotsVertical className="h-4 w-4" />
          </button>

          {actionMenuOpen === member.memberID && (
            <div
              className="absolute right-0 z-10 mt-1 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  onViewDetails(member);
                  setActionMenuOpen(null);
                }}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                <HiOutlineEye className="h-4 w-4 text-gray-400" />
                View Details
              </button>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}