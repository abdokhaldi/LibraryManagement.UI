// ─── Book Cover URL ────────────────────────────────────────────────────────────
export const BOOK_COVER_URL = "http://localhost:5016/images/covers/";
export const PLACEHOLDER_COVER = "/placeholder-cover.jpg";

// ─── Sort Directions ──────────────────────────────────────────────────────────
export const SORT_DIR = { ASC: "asc", DESC: "desc", NONE: "none" };

// ─── Book Copy Status Config ──────────────────────────────────────────────────
export const COPY_STATUS_CONFIG = {
  available: { label: "Loan", color: "bg-green-500", text: "Available" },
  borrowed: { label: "Return", color: "bg-blue-500", text: "Borrowed" },
  damaged: { label: "Repair", color: "bg-orange-500", text: "Damaged" },
  lost: { label: "---", color: "bg-red-600", text: "Lost" },
};

// ─── Messages ─────────────────────────────────────────────────────────────────
export const EMPTY_MESSAGES = {
  noBooks: "No books found",
  noCopies: "No copies found",
  tryAdjusting: "Try adjusting your search or filter criteria",
};