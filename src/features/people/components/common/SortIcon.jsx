import { HiOutlineChevronUp, HiOutlineChevronDown } from "react-icons/hi";

export function SortIcon({ columnKey, sortConfig }) {
  if (sortConfig.key !== columnKey) {
    return (
      <span className="ml-1 text-gray-300">
        <HiOutlineChevronUp className="h-3.5 w-3.5" />
        <HiOutlineChevronDown className="h-3.5 w-3.5" />
      </span>
    );
  }
  if (sortConfig.direction === "asc") {
    return <HiOutlineChevronUp className="ml-1 h-3.5 w-3.5 text-green-500" />;
  }
  if (sortConfig.direction === "desc") {
    return <HiOutlineChevronDown className="ml-1 h-3.5 w-3.5 text-green-500" />;
  }
  return (
    <span className="ml-1 text-gray-300">
      <HiOutlineChevronUp className="h-3.5 w-3.5" />
      <HiOutlineChevronDown className="h-3.5 w-3.5" />
    </span>
  );
}