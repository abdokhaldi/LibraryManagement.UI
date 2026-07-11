import { HiOutlineCalendar } from "react-icons/hi";

export function UserHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="mt-1 text-sm text-gray-500">
          Manage system users — control access, roles, and account status.
        </p>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <HiOutlineCalendar className="h-4 w-4" />
        <span>
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}