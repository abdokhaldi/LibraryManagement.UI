import SearchBar from "../../../commonCards/SearchBar.jsx";
import { RiUserAddLine } from "react-icons/ri";
import AddRecordButton from "../../../commonCards/AddRecordButton.jsx";

// ─── Filter button group ─────────────────────────────────────────────────────
function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-gray-500">{label}:</span>
      <div className="flex rounded-lg border border-gray-200 p-0.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={(e) => {
              e.stopPropagation();
              onChange(opt.value);
            }}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
              value === opt.value
                ? "bg-green-500 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const ACCESS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "unblocked", label: "Unblocked" },
  { value: "blocked", label: "Blocked" },
];

const ROLE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Admin", label: "Admin" },
  { value: "Librarian", label: "Librarian" },
  { value: "Staff", label: "Staff" },
];

export function UserFilters({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  statusFilter,
  setStatusFilter,
  blockFilter,
  setBlockFilter,
  roleFilter,
  setRoleFilter,
  onAddUser,
  selectedUsers,
  onClearSelection,
  onBulkActivate,
  onBulkDeactivate,
  onBulkBlock,
  onBulkUnblock,
  children,
}) {
  return (
    <div className="bg-white p-4 rounded-t-lg shadow-sm">
      {/* ── Search + Add ───────────────────────────────────────────────── */}
      <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-white">
        <SearchBar
          placeholder="Search by name, username, or role…"
          searchTerm={searchQuery}
          setSearchTerm={(val) => {
            setSearchQuery(val);
          }}
          onFilterClick={() => setShowFilters(!showFilters)}
          isFilterActive={showFilters}
        />
        <AddRecordButton 
              onClick={onAddUser}
              label="Add New User"
              className="px-8 py-2.5"
              />
      </div>

      {/* ── Expandable Filters ─────────────────────────────────────────── */}
      {showFilters && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg flex flex-wrap gap-4 animate-in fade-in">
          <FilterGroup
            label="Status"
            options={STATUS_OPTIONS}
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <FilterGroup
            label="Access"
            options={ACCESS_OPTIONS}
            value={blockFilter}
            onChange={setBlockFilter}
          />
          <FilterGroup
            label="Role"
            options={ROLE_OPTIONS}
            value={roleFilter}
            onChange={setRoleFilter}
          />
        </div>
      )}

      {children}

      {/* ── Bulk Actions ───────────────────────────────────────────────── */}
      {selectedUsers.size > 0 && (
        <div className="mt-4 flex items-center gap-3 border-t border-green-100 bg-green-50/50 -mx-4 -mb-4 px-4 py-3 rounded-b-lg">
          <span className="text-xs font-medium text-green-700">
            {selectedUsers.size} selected
          </span>
          <button
            onClick={onBulkActivate}
            className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-green-600"
          >
            Activate
          </button>
          <button
            onClick={onBulkDeactivate}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
          >
            Deactivate
          </button>
          <button
            onClick={onBulkBlock}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
          >
            Block
          </button>
          <button
            onClick={onBulkUnblock}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600 transition hover:bg-emerald-100"
          >
            Unblock
          </button>
          <button
            onClick={onClearSelection}
            className="ml-auto text-xs text-gray-500 hover:text-gray-700 transition"
          >
            Clear selection
          </button>
        </div>
      )}
    </div>
  );
}