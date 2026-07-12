// ─── Helper Functions for Loans Feature ────────────────────────────────────

/**
 * Get Tailwind classes for loan status badge
 * @param {string} status
 * @returns {string}
 */
export function getStatusStyle(status) {
  const styles = {
    Returned: "bg-green-100 text-green-700 border-green-200",
    Borrowed: "bg-blue-100 text-blue-700 border-blue-200",
    Overdue: "bg-red-100 text-red-700 border-red-200",
  };
  return styles[status] || "bg-gray-100 text-gray-700 border-gray-200";
}

/**
 * Format date string to locale date
 * @param {string} dateStr
 * @returns {string}
 */
export function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString();
}

/**
 * Calculate loan statistics from loans array
 * @param {Array} loans
 * @returns {{ total: number, borrowed: number, overdue: number, returned: number }}
 */
export function calculateLoanStats(loans) {
  return {
    total: loans.length,
    borrowed: loans.filter((l) => l.status === "Borrowed").length,
    overdue: loans.filter((l) => l.status === "Overdue").length,
    returned: loans.filter((l) => l.status === "Returned").length,
  };
}