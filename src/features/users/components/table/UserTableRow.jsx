import {
  HiOutlineBan,
  HiOutlineCheck,
  HiOutlineEye,
  HiOutlineLockClosed,
  HiOutlinePencil,
} from "react-icons/hi";
import { MdBlock } from "react-icons/md";
import { formatDate } from "../../utils/userHelpers.js";
import { UserAvatar } from "../common/UserAvatar.jsx";
import { StatusBadge } from "../badges/StatusBadge.jsx";
import { BlockedBadge } from "../badges/BlockedBadge.jsx";
import { RoleBadge } from "../badges/RoleBadge.jsx";

export function UserTableRow({
  user,
  isSelected,
  onSelect,
  onEdit,
  onToggleActive,
  onToggleBlocked,
  onView,
}) {
  return (
    <tr
      className={`group transition ${
        isSelected ? "bg-green-50/60" : "hover:bg-gray-50/80"
      } ${user.isBlocked ? "opacity-75" : ""}`}
    >
      {/* Checkbox */}
      <td className="px-4 py-3.5">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(user.userID)}
          className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500/20 cursor-pointer"
        />
      </td>

      {/* User info */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <UserAvatar user={user} size="md" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {user.person?.fullName}
            </p>
            <p className="truncate text-xs text-gray-500">@{user.username}</p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-4 py-3.5">
        <RoleBadge roleName={user.role?.roleName} />
      </td>

      {/* Created */}
      <td className="px-4 py-3.5 text-sm text-gray-500">
        {formatDate(user.createdAt)}
      </td>

      {/* Status (Active/Inactive) */}
      <td className="px-4 py-3.5">
        <StatusBadge isActive={user.isActive} />
      </td>

      {/* Access (Blocked/Unblocked) */}
      <td className="px-4 py-3.5">
        <BlockedBadge isBlocked={user.isBlocked} />
      </td>

      {/* Actions — isolated buttons */}
      <td className="px-4 py-3.5">
        <div className="flex items-center justify-end gap-1.5">
          {/* View button */}
          {onView && (
            <button
              onClick={() => onView(user)}
              title="View details"
              className="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600 focus:opacity-100"
            >
              <HiOutlineEye className="h-4 w-4" />
            </button>
          )}

          {/* Edit button */}
          <button
            onClick={() => onEdit(user)}
            title="Edit user"
            className="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-blue-50 hover:text-blue-600 focus:opacity-100"
          >
            <HiOutlinePencil className="h-4 w-4" />
          </button>

          {/* Activate/Deactivate toggle */}
          <button
            onClick={() => onToggleActive(user.userID)}
            title={user.isActive ? "Deactivate user" : "Activate user"}
            className={`rounded-lg p-1.5 opacity-0 transition group-hover:opacity-100 focus:opacity-100 ${
              user.isActive
                ? "text-gray-400 hover:bg-amber-50 hover:text-amber-600"
                : "text-gray-400 hover:bg-green-50 hover:text-green-600"
            }`}
          >
            {user.isActive ? (
              <HiOutlineBan className="h-4 w-4" />
            ) : (
              <HiOutlineCheck className="h-4 w-4" />
            )}
          </button>

          {/* Block/Unblock toggle */}
          <button
            onClick={() => onToggleBlocked(user.userID)}
            title={user.isBlocked ? "Unblock user" : "Block user"}
            className={`rounded-lg p-1.5 opacity-0 transition group-hover:opacity-100 focus:opacity-100 ${
              user.isBlocked
                ? "text-gray-400 hover:bg-emerald-50 hover:text-emerald-600"
                : "text-gray-400 hover:bg-red-50 hover:text-red-600"
            }`}
          >
            {user.isBlocked ? (
              <HiOutlineLockClosed className="h-4 w-4" />
            ) : (
              <MdBlock className="h-4 w-4" />
            )}
          </button>
        </div>
      </td>
    </tr>
  );
}