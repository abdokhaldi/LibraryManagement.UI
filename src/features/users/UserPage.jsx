import { useState, useEffect, useCallback, useMemo } from "react";
import {
  HiOutlineBan,
  HiOutlineCheck,
  HiOutlinePencil,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { MdBlock } from "react-icons/md";
import Pagination from "../../features/Pagination/Pagination.jsx";
import { fetchUsers, addUser, updateUser, deactivateUser, activateUser, blockUser, unblockUser } from "../../services/userService.js";
import UserFormModal from "./components/modals/UserFormModal.jsx";
import { UserDetailModal } from "./components/modals/UserDetailModal.jsx";
import { UserHeader } from "./components/common/UserHeader.jsx";
import { UserStats } from "./components/common/UserStats.jsx";
import { UserFilters } from "./components/filters/UserFilters.jsx";
import { UserTable } from "./components/table/UserTable.jsx";
import { SORT_DIR, EMPTY_MESSAGES } from "./constants/index.js";
import {
  nextDirection,
  calculateUserStats,
  filterUsers,
  sortUsers,
} from "./utils/userHelpers.js";

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
  const [detailModal, setDetailModal] = useState(null);
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
      console.log("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, searchQuery, sortConfig]);

  useEffect(() => {
    fetchUsersData();
  }, [fetchUsersData]);

  // ── Derived data ─────────────────────────────────────────────────────────
  const stats = useMemo(() => calculateUserStats(users), [users]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSort = useCallback((key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: nextDirection(prev.direction) };
      }
      return { key, direction: SORT_DIR.ASC };
    });
    setCurrentPage(1);
  }, []);

  const setStatusAndPage = useCallback((val) => {
    setStatusFilter(val);
    setCurrentPage(1);
  }, []);

  const setBlockAndPage = useCallback((val) => {
    setBlockFilter(val);
    setCurrentPage(1);
  }, []);

  const setRoleAndPage = useCallback((val) => {
    setRoleFilter(val);
    setCurrentPage(1);
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
        console.log("User added successfully");
        fetchUsersData();
      } else {
        alert(result.errorMessage || "Failed to add user");
        return;
      }
    } else if (modalMode === "edit" && editingUser) {
      const result = await updateUser(editingUser.userID, payload);
      if (result.success) {
        console.log("User updated successfully");
        fetchUsersData();
      } else {
        alert(result.errorMessage || "Failed to update user");
        return;
      }
    }
    setModalOpen(false);
  };

  // ── Toggle active for a single user ────────────────────────────────────────
  const handleToggleActive = useCallback(
    async (userID) => {
      const user = users.find((u) => u.userID === userID);
      if (!user) return;

      setUsers((prev) =>
        prev.map((u) =>
          u.userID === userID ? { ...u, isActive: !u.isActive } : u
        )
      );

      try {
        const result = user.isActive
          ? await deactivateUser(userID)
          : await activateUser(userID);

        if (!result.success) {
          setUsers((prev) =>
            prev.map((u) =>
              u.userID === userID ? { ...u, isActive: user.isActive } : u
            )
          );
          alert(result.errorMessage || "Failed to update user status");
        }
      } catch (error) {
        setUsers((prev) =>
          prev.map((u) =>
            u.userID === userID ? { ...u, isActive: user.isActive } : u
          )
        );
        alert("An error occurred while updating user status");
      }
    },
    [users]
  );

  // ── Toggle blocked for a single user ────────────────────────────────────────
  const handleToggleBlocked = useCallback(
    async (userID) => {
      const user = users.find((u) => u.userID === userID);
      if (!user) return;

      setUsers((prev) =>
        prev.map((u) =>
          u.userID === userID ? { ...u, isBlocked: !u.isBlocked } : u
        )
      );

      try {
        const result = user.isBlocked
          ? await unblockUser(userID)
          : await blockUser(userID);

        if (!result.success) {
          setUsers((prev) =>
            prev.map((u) =>
              u.userID === userID ? { ...u, isBlocked: user.isBlocked } : u
            )
          );
          alert(result.errorMessage || "Failed to update user access");
        }
      } catch (error) {
        setUsers((prev) =>
          prev.map((u) =>
            u.userID === userID ? { ...u, isBlocked: user.isBlocked } : u
          )
        );
        alert("An error occurred while updating user access");
      }
    },
    [users]
  );

  // ── Bulk action helper ────────────────────────────────────────────────────
  const runBulkAction = useCallback(
    async (actionFn, predicate, errorMsg, revertStateKey) => {
      const usersToUpdate = users.filter((u) => selectedUsers.has(u.userID));
      const originalStates = new Map(
        usersToUpdate.map((u) => [u.userID, u[revertStateKey]])
      );
      setUsers((prev) =>
        prev.map((u) =>
          selectedUsers.has(u.userID)
            ? { ...u, [revertStateKey]: predicate }
            : u
        )
      );

      try {
        for (const user of usersToUpdate) {
          if (user[revertStateKey] === predicate) continue;
          const result = await actionFn(user.userID);
          if (!result.success) {
            setUsers((prev) =>
              prev.map((u) =>
                originalStates.has(u.userID)
                  ? { ...u, [revertStateKey]: originalStates.get(u.userID) }
                  : u
              )
            );
            alert(result.errorMessage || errorMsg);
            return;
          }
        }
        setSelectedUsers(new Set());
      } catch (error) {
        setUsers((prev) =>
          prev.map((u) =>
            originalStates.has(u.userID)
              ? { ...u, [revertStateKey]: originalStates.get(u.userID) }
              : u
          )
        );
        alert(errorMsg);
      }
    },
    [selectedUsers, users]
  );

  const handleBulkActivate = useCallback(
    () => runBulkAction(activateUser, true, "Failed to activate some users", "isActive"),
    [runBulkAction]
  );

  const handleBulkDeactivate = useCallback(
    () => runBulkAction(deactivateUser, false, "Failed to deactivate some users", "isActive"),
    [runBulkAction]
  );

  const handleBulkBlock = useCallback(
    () => runBulkAction(blockUser, true, "Failed to block some users", "isBlocked"),
    [runBulkAction]
  );

  const handleBulkUnblock = useCallback(
    () => runBulkAction(unblockUser, false, "Failed to unblock some users", "isBlocked"),
    [runBulkAction]
  );

  // ── Toggle handlers passed to rows ────────────────────────────────────────
  const rowActionHandlers = useMemo(
    () => ({
      onEdit: handleOpenEditModal,
      onToggleActive: handleToggleActive,
      onToggleBlocked: handleToggleBlocked,
      onView: (user) => setDetailModal(user),
    }),
    [handleToggleActive, handleToggleBlocked]
  );

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
    <div>
      <div className="mx-auto space-y-6">
        <UserHeader />

        <UserStats stats={stats} />

        <UserFilters
          searchQuery={searchQuery}
          setSearchQuery={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          statusFilter={statusFilter}
          setStatusFilter={setStatusAndPage}
          blockFilter={blockFilter}
          setBlockFilter={setBlockAndPage}
          roleFilter={roleFilter}
          setRoleFilter={setRoleAndPage}
          onAddUser={handleOpenAddModal}
          selectedUsers={selectedUsers}
          onClearSelection={() => setSelectedUsers(new Set())}
          onBulkActivate={handleBulkActivate}
          onBulkDeactivate={handleBulkDeactivate}
          onBulkBlock={handleBulkBlock}
          onBulkUnblock={handleBulkUnblock}
        />

        <UserTable
          users={users}
          selectedUsers={selectedUsers}
          onSelectAll={handleSelectAll}
          onSelectUser={handleSelectUser}
          sortConfig={sortConfig}
          onSort={handleSort}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
          emptyMessages={EMPTY_MESSAGES}
          rowActionHandlers={rowActionHandlers}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <UserFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        user={editingUser}
        onSubmit={handleFormSubmit}
      />

      <UserDetailModal user={detailModal} onClose={() => setDetailModal(null)} />
    </div>
  );
}