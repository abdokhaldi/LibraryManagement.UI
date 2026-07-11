import { AVATAR_COLORS, SORT_DIR } from "../constants/index.js";

// ─── Date & Avatar Helpers ─────────────────────────────────────────────────────
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarColor(id) {
  const key = String(id);
  const hash = key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

// ─── Sort Helpers ─────────────────────────────────────────────────────────────
export function nextDirection(current) {
  if (current === "none") return "asc";
  if (current === "asc") return "desc";
  return "none";
}

// ─── Stats Helper ─────────────────────────────────────────────────────────────
export function calculateUserStats(users) {
  const active = users.filter((u) => u.isActive).length;
  const inactive = users.filter((u) => !u.isActive).length;
  const blocked = users.filter((u) => u.isBlocked).length;
  return { total: users.length, active, inactive, blocked };
}

// ─── Filter Helpers ───────────────────────────────────────────────────────────
export function filterUsers(users, searchQuery, statusFilter, blockFilter, roleFilter) {
  let result = users;

  // Search by name or username
  if (searchQuery && searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    result = result.filter(
      (u) =>
        (u.person?.fullName || "").toLowerCase().includes(q) ||
        (u.username || "").toLowerCase().includes(q) ||
        (u.role?.roleName || "").toLowerCase().includes(q)
    );
  }

  // Status filter
  if (statusFilter && statusFilter !== "all") {
    result = result.filter((u) =>
      statusFilter === "active" ? u.isActive : !u.isActive
    );
  }

  // Block filter
  if (blockFilter && blockFilter !== "all") {
    result = result.filter((u) =>
      blockFilter === "blocked" ? u.isBlocked : !u.isBlocked
    );
  }

  // Role filter
  if (roleFilter && roleFilter !== "all") {
    result = result.filter((u) => u.role?.roleName === roleFilter);
  }

  return result;
}

// ─── Sort Helper ──────────────────────────────────────────────────────────────
export function sortUsers(users, key, direction) {
  if (direction === "none" || !key) return users;

  const sorted = [...users].sort((a, b) => {
    let aValue;
    let bValue;

    if (key === "fullName") {
      aValue = a.person?.fullName || "";
      bValue = b.person?.fullName || "";
    } else if (key === "roleName") {
      aValue = a.role?.roleName || "";
      bValue = b.role?.roleName || "";
    } else if (key === "createdAt") {
      aValue = new Date(a.createdAt);
      bValue = new Date(b.createdAt);
    } else if (key === "isActive") {
      aValue = a.isActive;
      bValue = b.isActive;
    } else if (key === "isBlocked") {
      aValue = a.isBlocked;
      bValue = b.isBlocked;
    } else {
      aValue = a[key];
      bValue = b[key];
    }

    if (typeof aValue === "string") {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return direction === "asc" ? aValue - bValue : bValue - aValue;
  });

  return sorted;
}

// ─── Unique Values ────────────────────────────────────────────────────────────
export function getUniqueRoles(users) {
  return [...new Set(users.map((u) => u.role?.roleName).filter(Boolean))].sort();
}