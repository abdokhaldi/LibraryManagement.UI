import { PersonAvatar } from "../common/PersonAvatar";
import { AssociationBadge } from "../badges/AssociationBadge";
import { GenderBadge } from "../badges/GenderBadge";
import { HiOutlineEye, HiOutlineDotsVertical, HiOutlineX } from "react-icons/hi";
import { FaIdCard, FaVenusMars } from "react-icons/fa";
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";

export function PeopleTableRow({
  person,
  isSelected,
  onSelect,
  onViewDetails,
  onActionMenuToggle,
  actionMenuOpen,
  onEditPerson,
  onDeletePerson,
  onRowClick,
}) {
  return (
    <tr
      className={`group transition ${isSelected ? "bg-green-50/60" : "hover:bg-gray-50/80"}`}
      onClick={onRowClick}
    >
      {/* Checkbox */}
      <td className="px-4 py-3.5">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => {
            e.stopPropagation();
            onSelect(person.personID);
          }}
          className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500/20 cursor-pointer"
        />
      </td>

      {/* First Name with Avatar */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-3">
          <PersonAvatar person={person} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">
              {person.firstName}
            </p>
          </div>
        </div>
      </td>

      {/* Last Name */}
      <td className="px-4 py-3.5 text-sm text-gray-900">
        {person.lastName}
      </td>

      {/* National Number */}
      <td className="px-4 py-3.5 text-sm text-gray-700 font-mono">
        <span className="flex items-center gap-1.5">
          <FaIdCard className="h-3.5 w-3.5 text-gray-400" />
          {person.nationalNumber}
        </span>
      </td>

      {/* Phone */}
      <td className="px-4 py-3.5 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <HiOutlinePhone className="h-3.5 w-3.5 text-gray-400" />
          {person.phone}
        </span>
      </td>

      {/* Email */}
      <td className="px-4 py-3.5 text-sm text-gray-500 truncate max-w-xs">
        <span className="flex items-center gap-1.5">
          <HiOutlineMail className="h-3.5 w-3.5 text-gray-400" />
          {person.email}
        </span>
      </td>

      {/* Address */}
      <td className="px-4 py-3.5 text-sm text-gray-500 truncate max-w-xs">
        <span className="flex items-center gap-1.5">
          <HiOutlineLocationMarker className="h-3.5 w-3.5 text-gray-400" />
          {person.address}
        </span>
      </td>

      {/* City */}
      <td className="px-4 py-3.5 text-sm text-gray-500">
        {person.city}
      </td>

      {/* Gender */}
      <td className="px-4 py-3.5">
        <GenderBadge gender={person.gender} />
      </td>

      {/* Association */}
      <td className="px-4 py-3.5">
        <AssociationBadge association={person.association} details={person.associationDetails} />
      </td>

      {/* Actions */}
      <td className="px-4 py-3.5">
        <div className="flex items-center justify-end gap-1.5">
          {/* View Details */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(person);
              onActionMenuToggle(null);
            }}
            title="View details"
            className="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-blue-50 hover:text-blue-600 focus:opacity-100"
          >
            <HiOutlineEye className="h-4 w-4" />
          </button>

          {/* Action Menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onActionMenuToggle(
                  actionMenuOpen === person.personID ? null : person.personID
                );
              }}
              className="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-100 hover:text-gray-600 focus:opacity-100"
            >
              <HiOutlineDotsVertical className="h-4 w-4" />
            </button>

            {actionMenuOpen === person.personID && (
              <div className="absolute right-0 mt-1 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg z-10 animate-in fade-in zoom-in-95">
                <button
                  onClick={() => {
                    onViewDetails(person);
                    onActionMenuToggle(null);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  View Details
                </button>
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={() => {
                    onEditPerson(person);
                    onActionMenuToggle(null);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                >
                  Edit Person
                </button>
                <button
                  onClick={() => {
                    onDeletePerson(person);
                    onActionMenuToggle(null);
                  }}
                  className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  );
}