import { useState, useEffect, useCallback, useMemo } from "react";
import Pagination from '../../features/Pagination/Pagination';
import StatCard from '../../features/commonCards/StatCard';
import {
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineCheck,
  HiOutlineBan,
  HiOutlineCalendar,
  HiOutlineShieldCheck,
  HiOutlineLockClosed,
  HiOutlinePencil,
} from "react-icons/hi";
import {
  MdPeopleAlt,
  MdPersonOff,
  MdBlock,
  MdAdminPanelSettings,
} from "react-icons/md";
import { RiUserAddLine } from "react-icons/ri";
import SearchBar from '../commonCards/SearchBar';
import UserFormModal from "./UserFormModal";
import { fetchUsers, addUser, updateUser } from '../../services/userService';

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const AVATAR_COLORS = [
  "bg-green-100 text-green-700",
  "bg-emerald-100 text-emerald-700",
  "bg-teal-100 text-teal-700",
  "bg-lime-100 text-lime-700",
  "bg-cyan-100 text-cyan-700",
  "bg-sky-100 text-sky-700",
  "bg-amber-100 text-amber-700",
  "bg-orange-100 text-orange-700",
  "bg-rose-100 text-rose-700",
  "bg-violet-100 text-violet-700",
  "bg-indigo-100 text-indigo-700",
  "bg-fuchsia-100 text-fuchsia-700",
];

function getAvatarColor(id) {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

// ─── Sort helpers ────────────────────────────────────────────────────────────
const SORT_DIR = { ASC: "asc", DESC: "desc", NONE: "none" };

function nextDirection(current) {
  if (current === SORT_DIR.NONE) return SORT_DIR.ASC;
  if (current === SORT_DIR.ASC) return SORT_DIR.DESC;
  return SORT_DIR.NONE;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SortIcon({ columnKey, sortConfig }) {
  if (sortConfig.key !== columnKey) {
    return <span className="ml-1 text-gray-300">⇅</span>;
  }
  if (sortConfig.direction === SORT_DIR.ASC) {
    return <HiOutlineChevronUp className="ml-1 h-3.5 w-3.5 text-green-500" />;
  }
  if (sortConfig.direction === SORT_DIR.DESC) {
    return <HiOutlineChevronDown className="ml-1 h-3.5 w-3.5 text-green-500" />;
  }
  return <span className="ml-1 text-gray-300">⇅</span>;
}

function StatusBadge({ isActive }) {
  if (isActive) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-500 ring-1 ring-gray-500/20">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      Inactive
    </span>
  );
}

function BlockedBadge({ isBlocked }) {
  if (isBlocked) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-sm bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20">
        <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
        Blocked
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 ring-1 ring-emerald-600/20">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Unblocked
    </span>
  );
}

function RoleBadge({ roleName }) {
  const roleStyles = {
    Admin: "bg-violet-50 text-violet-700 ring-violet-600/20",
    Librarian: "bg-blue-50 text-blue-700 ring-blue-600/20",
    Staff: "bg-gray-50 text-gray-600 ring-gray-400/20",
  };
  const roleIcons = {
    Admin: <MdAdminPanelSettings className="h-3 w-3" />,
    Librarian: <HiOutlineShieldCheck className="h-3 w-3" />,
    Staff: <MdPeopleAlt className="h-3 w-3" />,
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-sm px-2.5 py-1 text-xs font-semibold ring-1 ${roleStyles[roleName] || roleStyles.Staff}`}>
      {roleIcons[roleName] || null}
      {roleName}
    </span>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function UserPage() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [blockFilter, setBlockFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "fullName",
    direction: SORT_DIR.ASC,
  });
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  // ── Fetch users from API ────────────────────────────────────────────────
  const fetchUsersData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchUsers({
        pageNumber: currentPage,
        pageSize: pageSize,
        searchTerm: searchQuery,
        orderBy: "",
    });
      setUsers(result.data);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.log('Failed to fetch users:');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize,searchQuery, sortConfig]);

   useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);
 

  // ── Derived data ────────────────────────────────────────────────────────
  const stats = useMemo(() => {
    const active = users.filter((u) => u.isActive).length;
    const inactive = users.filter((u) => !u.isActive).length;
    const blocked = users.filter((u) => u.isBlocked).length;
    return { total: users.length, active, inactive, blocked };
  }, [users]);

  // ── Handlers ────────────────────────────────────────────────────────────
  const handleSort = useCallback((key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: nextDirection(prev.direction) };
      }
      return { key, direction: SORT_DIR.ASC };
    });
    setCurrentPage(1);
  }, []);

  const handleToggleActive = useCallback((userID) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.userID === userID ? { ...u, isActive: !u.isActive } : u
      )
    );
  }, []);

  const handleToggleBlocked = useCallback((userID) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.userID === userID ? { ...u, isBlocked: !u.isBlocked } : u
      )
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map((u) => u.userID)));
    }
  }, [users, selectedUsers]);

  const handleSelectUser = useCallback((userID) => {
    setSelectedUsers((prev) => {
      const next = new Set(prev);
      if (next.has(userID)) next.delete(userID);
      else next.add(userID);
      return next;
    });
  }, []);

  const handleBulkActivate = useCallback(() => {
    setUsers((prev) =>
      prev.map((u) =>
        selectedUsers.has(u.userID) ? { ...u, isActive: true } : u
      )
    );
    setSelectedUsers(new Set());
  }, [selectedUsers]);

  const handleBulkDeactivate = useCallback(() => {
    setUsers((prev) =>
      prev.map((u) =>
        selectedUsers.has(u.userID) ? { ...u, isActive: false } : u
      )
    );
    setSelectedUsers(new Set());
  }, [selectedUsers]);

  const handleBulkBlock = useCallback(() => {
    setUsers((prev) =>
      prev.map((u) =>
        selectedUsers.has(u.userID) ? { ...u, isBlocked: true } : u
      )
    );
    setSelectedUsers(new Set());
  }, [selectedUsers]);

  const handleBulkUnblock = useCallback(() => {
    setUsers((prev) =>
      prev.map((u) =>
        selectedUsers.has(u.userID) ? { ...u, isBlocked: false } : u
      )
    );
    setSelectedUsers(new Set());
  }, [selectedUsers]);

  const handlePageChange = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      setSelectedUsers(new Set());
    }
  }, [totalPages]);

  const handleResetFilters = useCallback(() => {
    setSearchQuery("");
    setStatusFilter("all");
    setBlockFilter("all");
    setRoleFilter("all");
    setSortConfig({ key: "fullName", direction: SORT_DIR.ASC });
    setCurrentPage(1);
    
  }, []);
 
  const hasActiveFilters =
    searchQuery !== "" ||
    statusFilter !== "all" ||
    blockFilter !== "all" ||
    roleFilter !== "all";

  const handleOpenAddModal = () => {
    setModalMode("add");
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleOpenEditModal = (user) => {
    setModalMode("edit");
    setEditingUser(user);
    setModalOpen(true);
  };
 
  // handle add/edit user
  const handleFormSubmit = async (payload) => {
    console.log("Form submitted:", payload);
    if (modalMode === "add") {
      const result = await addUser(payload);
      if (result.success) {
        console.log('User added successfully');
        fetchUsersData();
      } else {
        alert(result.errorMessage || 'Failed to add user');
        return; // Don't close modal on error
      }
    } else if (modalMode === "edit" && editingUser) {
      const result = await updateUser(editingUser.userID, payload);
      if (result.success) {
        console.log('User updated successfully');
        fetchUsersData();
      } else {
        alert(result.errorMessage || 'Failed to update user');
        return; // Don't close modal on error
      }
    }
    setModalOpen(false);
  };

  // ── Render ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-600">
          Loading users from server...
        </div>
      </div>
    );
  }

  return (
    <div >
      <div className="mx-auto space-y-6 ">
      
        {/* ── Header ─────────────────────────────────────────────────────── */}
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

        {/* ── Stats Cards ────────────────────────────────────────────────── */}
        <div className="grid gap-4 sm:grid-cols-4">
          <StatCard
            label="Total Users"
            value={stats.total}
            icon={<MdPeopleAlt className="h-5 w-5" />}
            color="green"
          />
          <StatCard
            label="Active"
            value={stats.active}
            icon={<HiOutlineCheck className="h-5 w-5" />}
            color="emerald"
          />
          <StatCard
            label="Inactive"
            value={stats.inactive}
            icon={<MdPersonOff className="h-5 w-5" />}
            color="gray"
          />
          <StatCard
            label="Blocked"
            value={stats.blocked}
            icon={<MdBlock className="h-5 w-5" />}
            color="red"
          />
        </div>

        {/* ── Toolbar ────────────────────────────────────────────────────── */}
        <div className="bg-white p-4 rounded-t-lg shadow-sm">
          <div className="p-5 border-b border-slate-100 flex flex-wrap gap-4 items-center justify-between bg-white">
            <SearchBar
              placeholder="Search by name, username, or role…"
              searchTerm={searchQuery}
              setSearchTerm={(val) => { setSearchQuery(val); setCurrentPage(1); }}
              onFilterClick={() => setShowFilters(!showFilters)}
              isFilterActive={showFilters}
            />
            <button
              onClick={handleOpenAddModal}
              className="px-8 py-2.5 bg-green-500 text-white rounded hover:bg-green-400 flex items-center font-bold text-xm gap-2"
            >
              <RiUserAddLine className="h-4 w-4" />
              Add User
            </button>
          </div>

          {/* ── Expandable Filters ────────────────────────────────────────── */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg flex flex-wrap gap-4 animate-in fade-in">
              {/* Status filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">
                  Status:
                </span>
                <div className="flex rounded-lg border border-gray-200 p-0.5">
                  {[
                    { value: "all", label: "All" },
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Inactive" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setStatusFilter(opt.value);
                        setCurrentPage(1);
                      }}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                        statusFilter === opt.value
                          ? "bg-green-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Block filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">
                  Access:
                </span>
                <div className="flex rounded-lg border border-gray-200 p-0.5">
                  {[
                    { value: "all", label: "All" },
                    { value: "unblocked", label: "Unblocked" },
                    { value: "blocked", label: "Blocked" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setBlockFilter(opt.value);
                        setCurrentPage(1);
                      }}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                        blockFilter === opt.value
                          ? "bg-green-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Role filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500">
                  Role:
                </span>
                <div className="flex rounded-lg border border-gray-200 p-0.5">
                  {[
                    { value: "all", label: "All" },
                    { value: "Admin", label: "Admin" },
                    { value: "Librarian", label: "Librarian" },
                    { value: "Staff", label: "Staff" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={(e) => {
                        e.stopPropagation();
                        setRoleFilter(opt.value);
                        setCurrentPage(1);
                      }}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                        roleFilter === opt.value
                          ? "bg-green-500 text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Bulk Actions ──────────────────────────────────────────────── */}
          {selectedUsers.size > 0 && (
            <div className="mt-4 flex items-center gap-3 border-t border-green-100 bg-green-50/50 -mx-4 -mb-4 px-4 py-3 rounded-b-lg">
              <span className="text-xs font-medium text-green-700">
                {selectedUsers.size} selected
              </span>
              <button
                onClick={handleBulkActivate}
                className="inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-green-600"
              >
                <HiOutlineCheck className="h-3.5 w-3.5" />
                Activate
              </button>
              <button
                onClick={handleBulkDeactivate}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
              >
                <HiOutlineBan className="h-3.5 w-3.5" />
                Deactivate
              </button>
              <button
                onClick={handleBulkBlock}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-100"
              >
                <MdBlock className="h-3.5 w-3.5" />
                Block
              </button>
              <button
                onClick={handleBulkUnblock}
                className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-600 transition hover:bg-emerald-100"
              >
                <HiOutlineCheck className="h-3.5 w-3.5" />
                Unblock
              </button>
              <button
                onClick={() => setSelectedUsers(new Set())}
                className="ml-auto text-xs text-gray-500 hover:text-gray-700 transition"
              >
                Clear selection
              </button>
            </div>
          )}
        </div>

        {/* ── Table ──────────────────────────────────────────────────────── */}
        <div className="overflow-hidden rounded-b-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  <th className="w-12 px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={
                        users.length > 0 &&
                        selectedUsers.size === users.length
                      }
                      onChange={handleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500/20 cursor-pointer"
                    />
                  </th>
                  {[
                    { key: "fullName", label: "User" },
                    { key: "roleName", label: "Role" },
                    { key: "createdAt", label: "Created" },
                    { key: "isActive", label: "Status" },
                    { key: "isBlocked", label: "Access" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      onClick={() => handleSort(col.key)}
                      className="cursor-pointer select-none px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 transition hover:text-gray-900"
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        <SortIcon
                          columnKey={col.key}
                          sortConfig={sortConfig}
                        />
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-16 text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <MdPeopleAlt className="h-10 w-10 text-gray-300" />
                        <p className="text-sm font-medium text-gray-500">
                          No users found
                        </p>
                        <p className="text-xs text-gray-400">
                          Try adjusting your search or filter criteria
                        </p>
                        {hasActiveFilters && (
                          <button
                            onClick={handleResetFilters}
                            className="mt-2 text-xs font-medium text-green-600 hover:text-green-700 transition"
                          >
                            Clear all filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.userID}
                      className={`group transition ${
                        selectedUsers.has(user.userID)
                          ? "bg-green-50/60"
                          : "hover:bg-gray-50/80"
                      } ${user.isBlocked ? "opacity-75" : ""}`}
                    >
                      {/* Checkbox */}
                      <td className="px-4 py-3.5">
                        <input
                          type="checkbox"
                          checked={selectedUsers.has(user.userID)}
                          onChange={() => handleSelectUser(user.userID)}
                          className="h-4 w-4 rounded border-gray-300 text-green-500 focus:ring-green-500/20 cursor-pointer"
                        />
                      </td>

                      {/* User info */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${getAvatarColor(user.userID)}`}
                          >
                            {getInitials(user.person.fullName)}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900">
                              {user.person.fullName}
                            </p>
                            <p className="truncate text-xs text-gray-500">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-3.5">
                        <RoleBadge roleName={user.role.roleName} />
                      </td>

                      {/* Created */}
                      <td className="px-4 py-3.5 text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>

                      {/* Status (Active/Inactive) */}
                      <td className="px-4 py-3.5">
                        <StatusBadge isActive={user.isActive} />
                      </td>

                      {/* Access (Blocked/Unblocked) */}
                      <td className="px-4 py-3.5">
                        <BlockedBadge isBlocked={user.isBlocked} />
                      </td>

                      {/* Actions — isolated buttons */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit button */}
                          <button
                            onClick={() => handleOpenEditModal(user)}
                            title="Edit user"
                            className="rounded-lg p-1.5 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-blue-50 hover:text-blue-600 focus:opacity-100"
                          >
                            <HiOutlinePencil className="h-4 w-4" />
                          </button>

                          {/* Activate/Deactivate toggle */}
                          <button
                            onClick={() => handleToggleActive(user.userID)}
                            title={user.isActive ? "Deactivate user" : "Activate user"}
                            className={`rounded-lg p-1.5 opacity-0 transition group-hover:opacity-100 focus:opacity-100 ${
                              user.isActive
                                ? "text-gray-400 hover:bg-amber-50 hover:text-amber-600"
                                : "text-gray-400 hover:bg-green-50 hover:text-green-600"
                            }`}
                          >
                            {user.isActive ? (
                              <HiOutlineBan className="h-4 w-4" />
                            ) : (
                              <HiOutlineCheck className="h-4 w-4" />
                            )}
                          </button>

                          {/* Block/Unblock toggle */}
                          <button
                            onClick={() => handleToggleBlocked(user.userID)}
                            title={user.isBlocked ? "Unblock user" : "Block user"}
                            className={`rounded-lg p-1.5 opacity-0 transition group-hover:opacity-100 focus:opacity-100 ${
                              user.isBlocked
                                ? "text-gray-400 hover:bg-emerald-50 hover:text-emerald-600"
                                : "text-gray-400 hover:bg-red-50 hover:text-red-600"
                            }`}
                          >
                            {user.isBlocked ? (
                              <HiOutlineLockClosed className="h-4 w-4" />
                            ) : (
                              <MdBlock className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ────────────────────────────────────────────────── */}
          {users.length > 0 && (
              <Pagination
                onNext={() => handlePageChange(currentPage + 1)}
                onPrev={() => handlePageChange(currentPage - 1)}
                currentPage={currentPage}
                totalPages={totalPages}
               />
          )}
        </div>
      </div>

      {/* ── Add/Edit Modal ──────────────────────────────────────────────── */}
      <UserFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        user={editingUser}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}