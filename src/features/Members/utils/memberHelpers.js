// ─── Helper Functions for Members Feature ─────────────────────────────────────

// ─── Avatar Colors ────────────────────────────────────────────────────────────
export const AVATAR_COLORS = [
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

/**
 * Get initials from name
 * @param {string} name 
 * @returns {string}
 */
export function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Get avatar color based on ID
 * @param {number|string} id 
 * @returns {string}
 */
export function getAvatarColor(id) {
  if (!id) return AVATAR_COLORS[0];
  const key = String(id);
  const hash = key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

// ─── Sort Helpers ────────────────────────────────────────────────────────────
export const SORT_DIR = {
  ASC: "asc",
  DESC: "desc",
  NONE: "none",
};

/**
 * Get next sort direction
 * @param {string} current 
 * @returns {string}
 */
export function nextDirection(current) {
  if (current === SORT_DIR.NONE) return SORT_DIR.ASC;
  if (current === SORT_DIR.ASC) return SORT_DIR.DESC;
  return SORT_DIR.NONE;
}

// ─── Date Formatting ──────────────────────────────────────────────────────────
/**
 * Format date string
 * @param {string} dateStr 
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ─── Statistics ──────────────────────────────────────────────────────────────
/**
 * Calculate member statistics
 * @param {Array} members 
 * @returns {Object}
 */
export function calculateMemberStats(members) {
  const active = members.filter((m) => m.isActive).length;
  const inactive = members.filter((m) => !m.isActive).length;
  const totalBorrowed = members.reduce(
    (sum, m) => sum + (m.currentlyBorrowedBooks || 0),
    0
  );
  return { total: members.length, active, inactive, totalBorrowed };
}

/**
 * Get unique cities from members array
 * @param {Array} members 
 * @returns {Array}
 */
export function getUniqueMemberCities(members) {
  return [...new Set(members.map((m) => m.person?.city))].filter(Boolean).sort();
}

// ─── Filtering & Sorting ──────────────────────────────────────────────────────
/**
 * Filter members based on search query
 * @param {Array} members 
 * @param {string} searchQuery 
 * @returns {Array}
 */
export function filterMembers(members, searchQuery) {
  if (!searchQuery || !searchQuery.trim()) return members;
  
  const query = searchQuery.toLowerCase().trim();
  return members.filter((member) => {
    const fullName = member.person?.fullName?.toLowerCase() || "";
    const email = member.person?.email?.toLowerCase() || "";
    const phone = member.person?.phoneNumber?.toLowerCase() || "";
    const city = member.person?.city?.toLowerCase() || "";
    const membershipType = member.membershipType?.toLowerCase() || "";
    
    return (
      fullName.includes(query) ||
      email.includes(query) ||
      phone.includes(query) ||
      city.includes(query) ||
      membershipType.includes(query)
    );
  });
}

/**
 * Sort members by key
 * @param {Array} members 
 * @param {string} key 
 * @param {string} direction 
 * @returns {Array}
 */
export function sortMembers(members, key, direction) {
  if (direction === SORT_DIR.NONE) return members;
  
  return [...members].sort((a, b) => {
    let aVal = getNestedValue(a, key);
    let bVal = getNestedValue(b, key);
    
    if (aVal === null || aVal === undefined) aVal = "";
    if (bVal === null || bVal === undefined) bVal = "";
    
    if (typeof aVal === "string") aVal = aVal.toLowerCase();
    if (typeof bVal === "string") bVal = bVal.toLowerCase();
    
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

/**
 * Get nested value from object using dot notation
 * @param {Object} obj 
 * @param {string} path 
 * @returns {any}
 */
function getNestedValue(obj, path) {
  return path.split(".").reduce((current, key) => current?.[key], obj);
}

// ─── Pagination ───────────────────────────────────────────────────────────────
/**
 * Paginate array
 * @param {Array} array 
 * @param {number} page 
 * @param {number} pageSize 
 * @returns {Array}
 */
export function paginateMembers(array, page, pageSize) {
  const start = (page - 1) * pageSize;
  return array.slice(start, start + pageSize);
}

/**
 * Calculate total pages
 * @param {number} totalItems 
 * @param {number} pageSize 
 * @returns {number}
 */
export function calculateTotalPages(totalItems, pageSize) {
  return Math.ceil(totalItems / pageSize) || 1;
}

// ─── Table Columns ────────────────────────────────────────────────────────────
export const MEMBER_TABLE_COLUMNS = [
  { key: "fullName", label: "Member" },
  { key: "membershipDate", label: "Joined" },
  { key: "currentlyBorrowedBooks", label: "Borrowed" },
  { key: "totalBorrowedBooks", label: "Total" },
  { key: "isActive", label: "Status" },
];