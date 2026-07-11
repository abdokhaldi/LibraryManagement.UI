export const MEMBER_TABLE_COLUMNS = [
  { key: "fullName", label: "Member" },
  { key: "membershipDate", label: "Joined" },
  { key: "currentlyBorrowedBooks", label: "Borrowed" },
  { key: "totalBorrowedBooks", label: "Total" },
  { key: "isActive", label: "Status" },
];

export const SORT_DIR = {
  ASC: "asc",
  DESC: "desc",
  NONE: "none",
};

export function nextDirection(current) {
  if (current === SORT_DIR.NONE) return SORT_DIR.ASC;
  if (current === SORT_DIR.ASC) return SORT_DIR.DESC;
  return SORT_DIR.NONE;
}