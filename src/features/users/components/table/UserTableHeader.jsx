import { SortIcon } from "../common/SortIcon.jsx";

export function UserTableHeader({ sortConfig, onSort, onSelectAll, allSelected }) {
  const columns = [
    { key: "fullName", label: "User" },
    { key: "roleName", label: "Role" },
    { key: "createdAt", label: "Created" },
    { key: "isActive", label: "Status" },
    { key: "isBlocked", label: "Access" },
  ];

  return (
    <thead>
      <tr className="border-b border-gray-100 bg-gray-50/80">
        <th className="w-12 px-4 py-3.5">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onSelectAll}
            className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500/20 cursor-pointer"
          />
        </th>
        {columns.map((col) => (
          <th
            key={col.key}
            onClick={() => onSort(col.key)}
            className="cursor-pointer select-none px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 transition hover:text-gray-900"
          >
            <div className="flex items-center gap-1">
              {col.label}
              <SortIcon columnKey={col.key} sortConfig={sortConfig} />
            </div>
          </th>
        ))}
        <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">
          Actions
        </th>
      </tr>
    </thead>
  );
}