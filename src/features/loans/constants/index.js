// ─── Constants for Loans Feature ────────────────────────────────────

export const LOAN_TABLE_COLUMNS = [
  { key: "title", label: "Book Info" },
  { key: "fullName", label: "Member" },
  { key: "timeline", label: "Timeline" },
  { key: "feesAndFines", label: "Fees & Fines" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];

export const LOAN_STATUS_STYLES = {
  Returned: "bg-green-100 text-green-700 border-green-200",
  Borrowed: "bg-blue-100 text-blue-700 border-blue-200",
  Overdue: "bg-red-100 text-red-700 border-red-200",
};

export const PAGE_SIZE = 8;