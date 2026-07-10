import { HiOutlineUser } from "react-icons/hi";
import { RiGroupLine } from "react-icons/ri";
import { MdPersonOff } from "react-icons/md";

export function AssociationBadge({ association, details }) {
  if (association === "user") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-600/20">
        <HiOutlineUser className="h-3 w-3" />
        User
        {details?.type && (
          <span className="ml-1 px-1.5 py-0.5 bg-blue-100 rounded text-[10px] font-semibold">
            {details.type}
          </span>
        )}
      </span>
    );
  }
  if (association === "member") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700 ring-1 ring-purple-600/20">
        <RiGroupLine className="h-3 w-3" />
        Member
        {details?.type && (
          <span className="ml-1 px-1.5 py-0.5 bg-purple-100 rounded text-[10px] font-semibold">
            {details.type}
          </span>
        )}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-500/20">
      <MdPersonOff className="h-3 w-3" />
      None
    </span>
  );
}