import { FaVenusMars } from "react-icons/fa";

export function GenderBadge({ gender }) {
  if (gender === "Male") {
    return (
      <span className="inline-flex items-center gap-1 rounded-sm bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-600/20">
        <FaVenusMars className="h-3 w-3" />
        Male
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-sm bg-pink-50 px-2.5 py-1 text-xs font-medium text-pink-700 ring-1 ring-pink-600/20">
      <FaVenusMars className="h-3 w-3" />
      Female
    </span>
  );
}