import { HiOutlineCalendar } from "react-icons/hi";
import { RiUserAddLine } from "react-icons/ri";

export function MemberHeader() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="py-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Members</h1>
          <p className="mt-1 text-sm text-gray-500">
            Library member management — view, filter, and manage member records with borrowing history.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <HiOutlineCalendar className="h-4 w-4" />
            <span>{currentDate}</span>
          </div>
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 flex items-center font-medium text-sm gap-2">
            <RiUserAddLine className="h-4 w-4" />
            Add Member
          </button>
        </div>
      </div>
    </div>
  );
}