import { HiOutlineX, HiOutlineMail, HiOutlinePhone, HiOutlineCalendar, HiOutlineBookOpen } from "react-icons/hi";
import { MdPeopleAlt } from "react-icons/md";
import { IoFilter } from "react-icons/io5";
import { MemberAvatar } from "../common/MemberAvatar";
import { StatusBadge } from "../badges/StatusBadge";
import { DetailRow } from "../common/DetailRow";
import { getInitials, getAvatarColor, formatDate } from "../../utils/memberHelpers";

export function MemberDetailModal({ member, onClose }) {
  if (!member) return null;

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
            <MemberAvatar member={member} size="lg" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {member.person?.fullName}
              </h3>
              <StatusBadge isActive={member.isActive} />
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
          <DetailRow
            icon={<HiOutlineMail className="h-4 w-4" />}
            label="Email"
            value={member.person?.email || "—"}
          />
          <DetailRow
            icon={<HiOutlinePhone className="h-4 w-4" />}
            label="Phone"
            value={member.person?.phoneNumber || "—"}
          />
          <DetailRow
            icon={<HiOutlineCalendar className="h-4 w-4" />}
            label="Member since"
            value={formatDate(member.membershipDate)}
          />
          <DetailRow
            icon={<HiOutlineBookOpen className="h-4 w-4" />}
            label="Currently borrowed"
            value={`${member.currentlyBorrowedBooks ?? 0} book(s)`}
          />
          <DetailRow
            icon={<MdPeopleAlt className="h-4 w-4" />}
            label="Total borrowed"
            value={`${member.totalBorrowedBooks ?? 0} book(s)`}
          />
          <DetailRow
            icon={<IoFilter className="h-4 w-4" />}
            label="Membership type"
            value={member.membershipType || "—"}
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