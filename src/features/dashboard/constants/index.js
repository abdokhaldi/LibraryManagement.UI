// ─── Constants for Dashboard Feature ────────────────────────────────────

export const ANALYTICS_CARDS = [
  { title: "MONTHLY LOANS", value: "2,842", percentage: "+12.5% vs prev.", color: "red" },
  { title: "NEW MEMBERS", value: "2,842", percentage: "+5.2% vs prev.", color: "green" },
  { title: "REVENUE FROM FINES", value: "2,842", percentage: "-2.4% vs prev.", color: "amber" },
  { title: "INVENTORY UTIL %", value: "2,842", percentage: "+3.1% vs prev.", color: "yellow" },
];

export const WEEK_DAYS = [
  { name: "MON", height: "10" },
  { name: "TUE", height: "20" },
  { name: "WED", height: "30" },
  { name: "THU", height: "40" },
  { name: "FRI", height: "50" },
  { name: "SAT", height: "60" },
  { name: "SUN", height: "70" },
];

export const POPULAR_CATEGORIES = [
  { categoryName: "Computer science", percentage: 10 },
  { categoryName: "Biology", percentage: 20 },
  { categoryName: "Chemistry", percentage: 30 },
  { categoryName: "Philosophy", percentage: 40 },
  { categoryName: "History", percentage: 50 },
  { categoryName: "Languages", percentage: 60 },
];

export const ACTIVITY_STATUS_STYLES = {
  borrowed: "bg-red-500/50",
  Completed: "bg-green-300/50",
  available: "bg-blue-600",
};

export const ACTIVITIES = [
  { id: 1, memberName: "John Doe", bookTitle: "The Great Gatsby", action: "Borrowed", status: "borrowed", time: "10:30 AM" },
  { id: 2, memberName: "Jane Smith", bookTitle: "1984", action: "Returned", status: "Completed", time: "2:15 PM" },
  { id: 3, memberName: "John Doe", bookTitle: "The Great Gatsby", action: "Borrowed", status: "borrowed", time: "10:30 AM" },
  { id: 4, memberName: "Jane Smith", bookTitle: "1984", action: "Returned", status: "Completed", time: "2:15 PM" },
  { id: 5, memberName: "John Doe", bookTitle: "The Great Gatsby", action: "Borrowed", status: "borrowed", time: "10:30 AM" },
];

export const CHART_TITLES = {
  1: "Loans trend",
  2: "Most Popular Categories",
};

export const ACTIVITY_TABLE_COLUMNS = [
  { key: "memberName", label: "Member Name" },
  { key: "bookTitle", label: "Book Title" },
  { key: "action", label: "Action" },
  { key: "status", label: "Status" },
  { key: "time", label: "Time" },
];