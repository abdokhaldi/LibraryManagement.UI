import { RiUserAddLine } from "react-icons/ri";

export function AddRecordButton({ label = "Add Record", onClick, icon: Icon = RiUserAddLine, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-400 flex items-center font-medium text-sm gap-2 ${className}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

export default AddRecordButton;