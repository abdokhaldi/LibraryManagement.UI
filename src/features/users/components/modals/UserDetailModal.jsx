import {
  HiOutlineX,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineShieldCheck,
} from "react-icons/hi";
import { UserAvatar } from "../common/UserAvatar.jsx";
import { StatusBadge } from "../badges/StatusBadge.jsx";
import { BlockedBadge } from "../badges/BlockedBadge.jsx";
import { UserDetailRow } from "../common/UserDetailRow.jsx";
import { formatDate } from "../../utils/userHelpers.js";

export function UserDetailModal({ user, onClose }) {
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 shadow-xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar user={user} size="lg" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {user.person?.fullName}
              </h3>
              <p className="text-xs text-gray-500">@{user.username}</p>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <StatusBadge isActive={user.isActive} />
                <BlockedBadge isBlocked={user.isBlocked} />
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
          >
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <UserDetailRow
            icon={<HiOutlineUser className="h-4 w-4" />}
            label="Username"
            value={user.username || "—"}
          />
          <UserDetailRow
            icon={<HiOutlineMail className="h-4 w-4" />}
            label="Email"
            value={user.person?.email || "—"}
          />
          <UserDetailRow
            icon={<HiOutlinePhone className="h-4 w-4" />}
            label="Phone"
            value={user.person?.phone || "—"}
          />
          <UserDetailRow
            icon={<HiOutlineCalendar className="h-4 w-4" />}
            label="Member since"
            value={formatDate(user.createdAt)}
          />
          <UserDetailRow
            icon={<HiOutlineShieldCheck className="h-4 w-4" />}
            label="Role"
            value={user.role?.roleName || "—"}
          />
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}