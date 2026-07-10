import { useEffect } from "react";
import { HiOutlineX, HiOutlineIdentification, HiOutlineCalendar, HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker, HiOutlineUser } from "react-icons/hi";
import { FaIdCard, FaVenusMars, FaUserTag } from "react-icons/fa";
import { MdBadge } from "react-icons/md";
import { PersonAvatar } from "../common/PersonAvatar";
import { AssociationBadge } from "../badges/AssociationBadge";
import { GenderBadge } from "../badges/GenderBadge";
import { getInitials, getAvatarColor } from "../../utils/helpers";

export function PersonDetailModal({
  person,
  isOpen,
  onClose,
  onEdit,
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !person) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="person-detail-title"
    >
      <div
        className="w-full max-w-2xl rounded-2xl p-6 shadow-xl bg-white max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold ${getAvatarColor(person.personID)}`}>
              {getInitials(person.firstName, person.lastName)}
            </div>
            <div>
              <h3 id="person-detail-title" className="text-xl font-semibold text-gray-900">
                {person.firstName} {person.lastName}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <AssociationBadge association={person.association} details={person.associationDetails} />
                <GenderBadge gender={person.gender} />
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close modal"
          >
            <HiOutlineX className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {/* Personal Information Section */}
          <div className="border-t pt-5">
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider text-gray-500 mb-4">
              Personal Information
            </h4>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <span className="text-gray-400"><FaIdCard className="h-4 w-4" /></span>
                <div>
                  <p className="text-xs text-gray-500">National Number</p>
                  <p className="text-sm font-medium text-gray-900 font-mono">{person.nationalNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400"><HiOutlineCalendar className="h-4 w-4" /></span>
                <div>
                  <p className="text-xs text-gray-500">Gender</p>
                  <p className="text-sm font-medium text-gray-900">{person.gender}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400"><HiOutlinePhone className="h-4 w-4" /></span>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-medium text-gray-900">{person.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-400"><HiOutlineMail className="h-4 w-4" /></span>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm font-medium text-gray-900">{person.email}</p>
                </div>
              </div>
              <div className="sm:col-span-2 flex items-center gap-3">
                <span className="text-gray-400"><HiOutlineLocationMarker className="h-4 w-4" /></span>
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-medium text-gray-900">{person.address}, {person.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Association Details Section */}
          {person.association !== "none" && person.associationDetails && (
            <div className="border-t pt-5">
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider text-gray-500 mb-4">
                {person.association === "user" ? "User Account Details" : "Membership Details"}
              </h4>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3">
                  <span className="text-gray-400"><FaUserTag className="h-4 w-4" /></span>
                  <div>
                    <p className="text-xs text-gray-500">Type / Role</p>
                    <p className="text-sm font-medium text-gray-900">{person.associationDetails.type}</p>
                  </div>
                </div>
                {person.association === "user" && person.associationDetails.username && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400"><HiOutlineUser className="h-4 w-4" /></span>
                    <div>
                      <p className="text-xs text-gray-500">Username</p>
                      <p className="text-sm font-medium text-gray-900">@{person.associationDetails.username}</p>
                    </div>
                  </div>
                )}
                {person.association === "member" && person.associationDetails.membershipDate && (
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400"><HiOutlineCalendar className="h-4 w-4" /></span>
                    <div>
                      <p className="text-xs text-gray-500">Member Since</p>
                      <p className="text-sm font-medium text-gray-900">{person.associationDetails.membershipDate}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* No Association Message */}
          {person.association === "none" && (
            <div className="border-t pt-5">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MdBadge className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">No System Association</p>
                  <p className="text-xs text-gray-500">This person is not linked to any user account or library membership.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              if (onEdit) onEdit(person);
            }}
            className="flex-1 rounded-lg bg-green-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-400"
          >
            Edit Person
          </button>
        </div>
      </div>
    </div>
  );
}