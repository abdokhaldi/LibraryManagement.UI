import { HiOutlineCalendar } from "react-icons/hi";

export function SubHeader() {
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
        {
        // empty container
        }
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <HiOutlineCalendar className="h-4 w-4" />
            <span>{currentDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}