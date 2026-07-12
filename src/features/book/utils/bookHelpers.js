import { SORT_DIR } from "../constants/index.js";

// ─── Sort Helpers ─────────────────────────────────────────────────────────────
export function nextDirection(current) {
  if (current === "none") return "asc";
  if (current === "asc") return "desc";
  return "none";
}

// ─── Stats Helper ─────────────────────────────────────────────────────────────
export function calculateBookStats(books) {
  const totalBooks = books.length;
  const totalCopies = books.reduce((sum, b) => sum + (b.totalCopies || 0), 0);
  const availableCopies = books.reduce(
    (sum, b) => sum + (b.availableCopies || 0),
    0
  );
  return { totalBooks, totalCopies, availableCopies };
}

// ─── Filter Helpers ───────────────────────────────────────────────────────────
export function filterBooks(books, searchTerm, category) {
  let result = books;

  // Search by title, isbn, or author
  if (searchTerm && searchTerm.trim()) {
    const q = searchTerm.toLowerCase();
    result = result.filter(
      (b) =>
        (b.title || "").toLowerCase().includes(q) ||
        (b.isbn || "").toLowerCase().includes(q) ||
        (b.author || "").toLowerCase().includes(q)
    );
  }

  // Category filter
  if (category && category !== "All") {
    result = result.filter((b) => String(b.categoryID) === String(category));
  }

  return result;
}

// ─── Sort Helper ──────────────────────────────────────────────────────────────
export function sortBooks(books, key, direction) {
  if (direction === SORT_DIR.NONE || !key) return books;

  const sorted = [...books].sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];

    if (typeof aValue === "string") {
      return direction === SORT_DIR.ASC
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return direction === SORT_DIR.ASC ? aValue - bValue : bValue - aValue;
  });

  return sorted;
}

// ─── Unique Values ────────────────────────────────────────────────────────────
export function getUniqueCategories(books) {
  return [...new Set(books.map((b) => b.categoryID).filter(Boolean))].sort();
}